"use client";

import { useEffect, useRef } from "react";

interface LedGridProps {
  className?: string;
}

export function LedGrid({ className }: LedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const gap = 48;
    const cols = Math.ceil(width / gap) + 1;
    const rows = Math.ceil(height / gap) + 1;

    interface Dot {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      phase: number;
      speed: number;
    }

    const dots: Dot[] = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: i * gap,
          y: j * gap,
          baseX: i * gap,
          baseY: j * gap,
          size: Math.random() * 1.5 + 0.8,
          phase: Math.random() * Math.PI * 2,
          speed: 0.002 + Math.random() * 0.003,
        });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      dots.forEach((dot) => {
        if (!prefersReducedMotion) {
          dot.phase += dot.speed;
        }

        const pulse = Math.sin(dot.phase) * 0.4 + 0.6;
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 180;
        const influence = Math.max(0, 1 - distance / maxDistance);

        const targetSize = dot.size + influence * 2.5;
        const brightness = 0.25 + pulse * 0.35 + influence * 0.45;

        ctx.beginPath();
        ctx.arc(dot.baseX, dot.baseY, targetSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(145, 169, 161, ${brightness})`;
        ctx.fill();

        if (influence > 0) {
          ctx.beginPath();
          ctx.arc(dot.baseX, dot.baseY, targetSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(145, 169, 161, ${influence * 0.08})`;
          ctx.fill();
        }
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className || ""}`}
      aria-hidden="true"
    />
  );
}
