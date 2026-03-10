import { cn } from "@/lib/utils";

export interface ContentCardProps {
  src: string;
  alt?: string;
  className?: string;
  /** Design system: Default | Focus (yellow border) */
  focused?: boolean;
}

export function ContentCard({
  src,
  alt = "",
  className,
  focused,
}: ContentCardProps) {
  return (
    <article
      className={cn(
        "relative h-[224px] w-[144px] shrink-0 overflow-hidden rounded-[var(--radius-6)]",
        "bg-background-primary",
        focused &&
          "ring-2 ring-action-primary ring-offset-4 ring-offset-background-overlay rounded-[10px]",
        className
      )}
    >
      <div className="size-full overflow-hidden rounded-[var(--radius-6)]">
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
        />
      </div>
    </article>
  );
}
