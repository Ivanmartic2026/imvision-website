"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

export function ProjectGallery({
  images,
  label = "Gallery",
}: {
  images: GalleryImage[];
  label?: string;
}) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % images.length) + images.length) % images.length);
    },
    [images.length],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, prev, next]);

  if (images.length === 0) return null;

  const active = images[index];

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="eyebrow text-accent">{label}</p>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      <div className="light-gate media-frame relative mt-6 aspect-[4/3] w-full overflow-hidden border border-border-subtle sm:aspect-[16/9]">
        <AnimatePresence initial={false} mode="wait">
          <motion.button
            key={active.src}
            type="button"
            onClick={() => setLightboxOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-0 h-full w-full cursor-zoom-in"
            aria-label={active.alt}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
              priority={index === 0}
            />
          </motion.button>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#070807]/55 text-[#f2f0e9] backdrop-blur-md transition-colors duration-300 hover:bg-[#070807]/80"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#070807]/55 text-[#f2f0e9] backdrop-blur-md transition-colors duration-300 hover:bg-[#070807]/80"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative h-16 w-24 flex-none overflow-hidden border transition-opacity duration-300 sm:h-20 sm:w-28 ${
                i === index
                  ? "border-accent opacity-100"
                  : "border-border-subtle opacity-60 hover:opacity-90"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#070807]/92 p-4 backdrop-blur-md sm:p-10"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#f2f0e9] transition-colors duration-300 hover:bg-white/10"
            >
              <X size={20} />
            </button>

            <div
              className="relative h-full w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-[#f2f0e9] transition-colors duration-300 hover:bg-white/10 sm:left-8"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-[#f2f0e9] transition-colors duration-300 hover:bg-white/10 sm:right-8"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
              {active.alt}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
