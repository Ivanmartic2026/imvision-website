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
  limitText?: string;
  dragLabel?: string;
  dragHint?: string;
  error?: string;
}

const MAX_FILES = 5;
const MAX_SIZE_MB = 25;
const ACCEPT = "image/*,.pdf,.dwg,.doc,.docx,.txt,.zip,.mp4,.mov,.webm";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
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
  limitText,
  dragLabel,
  dragHint,
  error,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rejected, setRejected] = useState<{ tooLarge: File[]; wrongType: File[] }>({ tooLarge: [], wrongType: [] });

  const maxBytes = maxSizeMB * 1024 * 1024;

  function isValidType(file: File) {
    const accepted = accept.split(",");
    return accepted.some((type) => {
      const trimmed = type.trim();
      if (trimmed.endsWith("/*")) return file.type.startsWith(trimmed.slice(0, -1));
      return file.name.toLowerCase().endsWith(trimmed.toLowerCase()) || file.type === trimmed;
    });
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const incoming = Array.from(fileList);
    const tooLarge: File[] = [];
    const wrongType: File[] = [];
    const valid: UploadedFile[] = [];

    incoming.forEach((file) => {
      if (file.size > maxBytes) {
        tooLarge.push(file);
        return;
      }
      if (!isValidType(file)) {
        wrongType.push(file);
        return;
      }
      valid.push({
        file,
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      });
    });

    setRejected({ tooLarge, wrongType });
    const combined = [...files, ...valid].slice(0, maxFiles);
    onChange(combined);
  }

  function removeFile(id: string) {
    onChange(files.filter((f) => f.id !== id));
    if (files.length <= 1) setRejected({ tooLarge: [], wrongType: [] });
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
          "cursor-pointer rounded-2xl border-2 border-dashed p-5 transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)]",
          "hover:border-accent/50 hover:bg-bg-elevated",
          isDragging ? "border-accent bg-accent/[0.06]" : "border-border-subtle bg-bg-surface",
          error && "border-red-400/50"
        )}
      >
        <input ref={inputRef} type="file" multiple accept={accept} onChange={handleChange} className="sr-only" />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-elevated text-accent">
            <Upload size={20} />
          </span>
          <span className="text-sm text-text-secondary">
            <span className="font-medium text-text-primary">{dragLabel || "Click to upload"}</span>{" "}
            {dragHint || "or drag and drop files here"}
          </span>
          {description && <span className="text-xs text-text-muted">{description}</span>}
          <span className="text-xs text-text-muted">{limitText || `Max ${maxFiles} files, ${maxSizeMB} MB each`}</span>
        </div>
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map(({ file, id }) => (
            <li
              key={id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-bg-surface px-4 py-3"
            >
              <span className="flex items-center gap-3 text-sm text-text-primary">
                <span className="text-accent">{fileIcon(file.type)}</span>
                <span className="max-w-[160px] truncate sm:max-w-[240px]">{file.name}</span>
                <span className="text-xs text-text-muted">{formatSize(file.size)}</span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(id)}
                className="rounded-full p-1.5 text-text-muted transition-colors hover:bg-bg-elevated hover:text-text-primary"
                aria-label={`Remove ${file.name}`}
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {rejected.tooLarge.length > 0 && (
        <p className="mt-2 text-sm text-red-500">
          {rejected.tooLarge.length === 1
            ? `${rejected.tooLarge[0].name} is too large. Max ${maxSizeMB} MB per file.`
            : `${rejected.tooLarge.length} files were too large. Max ${maxSizeMB} MB per file.`}
        </p>
      )}
      {rejected.wrongType.length > 0 && (
        <p className="mt-2 text-sm text-red-500">
          {rejected.wrongType.length === 1
            ? `${rejected.wrongType[0].name} has an unsupported format.`
            : `${rejected.wrongType.length} files had unsupported formats.`}
        </p>
      )}
      {remaining <= 0 && <p className="mt-2 text-xs text-text-muted">Maximum number of files reached.</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
