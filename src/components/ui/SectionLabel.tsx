import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function SectionLabel({ children, className, light }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "eyebrow",
        light ? "text-accent-soft" : "text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}
