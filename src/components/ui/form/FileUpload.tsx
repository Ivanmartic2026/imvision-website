"use client";

import { cn } from "@/lib/utils";
import { Upload, X, FileText, ImageIcon, Film, FileArchive } from "lucide-react";
import { useRef, useState, DragEvent, ChangeEvent, ReactNode } from "react";

export interface UploadedFile {
  file: File;
  id: string;
}

interface FileUploadProps {
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  label?: string;
  description?: string;
  dragLabel?: string;
  dragHint?: string;
  error?: string;
}

const MAX_FILES = 5;
const MAX_SIZE_MB = 25;
const ACCEPT = "image/*,.pdf,.dwg,.doc,.docx,.txt,.zip,.mp4,.mov,.webm";

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileIcon(type: string): ReactNode {
  if (type.startsWith("video/")) return <Film size={18} />;
  if (type.startsWith("image/")) return <ImageIcon size={18} />;
  if (type.includes("zip") || type.includes("compressed")) return <FileArchive size={18} />;
  return <FileText size={18} />;
}

export function FileUpload({
  files,
  onChange,
  maxFiles = MAX_FILES,
  maxSizeMB = MAX_SIZE_MB,
  accept = ACCEPT,
  label,
  description,
  dragLabel,
  dragHint,
  error,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const maxBytes = maxSizeMB * 1024 * 1024;

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const incoming = Array.from(fileList);
    const valid: UploadedFile[] = [];
    incoming.forEach((file) => {
      if (file.size > maxBytes) return;
      valid.push({ file, id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` });
    });
    const combined = [...files, ...valid].slice(0, maxFiles);
    onChange(combined);
  }

  function removeFile(id: string) {
    onChange(files.filter((f) => f.id !== id));
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    addFiles(e.target.files);
    e.target.value = "";
  }

  const remaining = maxFiles - files.length;

  return (
    <div>
      {label && <p className="mb-2 text-sm font-medium text-text-primary">{label}</p>}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "cursor-pointer rounded-2xl border-2 border-dashed p-6 transition-all duration-[500ms] ease-[cubic-bezier(.22,.61,.36,1)]",
          "hover:border-accent/50 hover:bg-white/[.02]",
          isDragging ? "border-accent bg-accent/[0.06]" : "border-border-subtle bg-bg-surface",
          error && "border-red-400/50"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleChange}
          className="sr-only"
        />
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-[14px_4px_14px_14px] bg-background text-accent">
            <Upload size={22} />
          </span>
          <span className="text-sm text-text-secondary">
            <span className="font-medium text-text-primary">{dragLabel || "Click to upload"}</span>{" "}
            {dragHint || "or drag and drop files here"}
          </span>
          {description && <span className="text-xs text-text-muted">{description}</span>}
          <span className="text-xs text-text-muted">
            Max {maxFiles} files, {maxSizeMB} MB each
          </span>
        </div>
      </div>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map(({ file, id }) => (
            <li
              key={id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-bg-surface px-4 py-3"
            >
              <span className="flex items-center gap-3 text-sm text-text-primary">
                <span className="text-accent">{fileIcon(file.type)}</span>
                <span className="max-w-[180px] truncate sm:max-w-[260px]">{file.name}</span>
                <span className="text-xs text-text-muted">{formatSize(file.size)}</span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(id)}
                className="rounded-full p-1 text-text-muted transition-colors hover:bg-white/[.05] hover:text-text-primary"
                aria-label={`Ta bort ${file.name}`}
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      {remaining <= 0 && <p className="mt-2 text-xs text-text-muted">Max antal filer uppnått.</p>}
    </div>
  );
}
