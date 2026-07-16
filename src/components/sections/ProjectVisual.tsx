import Image from "next/image";
import { Project } from "@/lib/projects";

export function ProjectVisual({
  project,
  label,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: {
  project: Project;
  label?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (project.visualPlaceholder) {
    return (
      <div
        className="absolute inset-0 overflow-hidden bg-[linear-gradient(145deg,#0c121d_0%,#111d31_48%,#14294c_100%)]"
        role="img"
        aria-label={label || project.visualLabel || project.title}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(rgba(242,244,248,.42) .7px, transparent .8px)",
            backgroundSize: "14px 14px",
            maskImage: "linear-gradient(to bottom right, transparent 5%, #000 65%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom right, transparent 5%, #000 65%, transparent 100%)",
          }}
        />
        <div className="absolute -right-[12%] top-[12%] h-[78%] w-[58%] border border-white/[.07] bg-white/[.025] shadow-[0_40px_120px_rgba(0,0,0,.35)] [transform:skewY(-8deg)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#070807]/65 to-transparent" />
        <span className="absolute bottom-5 left-5 z-10 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55 sm:bottom-7 sm:left-7">
          {project.visualLabel || label || project.title}
        </span>
      </div>
    );
  }

  return (
    <>
      <Image
        src={project.image}
        alt={label || project.title}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.02]"
      />
      {project.imageCredit && (
        <span className="absolute bottom-5 left-5 z-10 font-mono text-[9px] uppercase tracking-[0.12em] text-white/55 sm:bottom-7 sm:left-7">
          {project.imageCredit}
        </span>
      )}
    </>
  );
}
