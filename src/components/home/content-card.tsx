import { cn } from "@/lib/utils";

export interface ContentCardProps {
  src: string;
  alt?: string;
  className?: string;
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
        "relative shrink-0 overflow-hidden rounded-[var(--radius-6)]",
        "h-[224px] w-[144px]",
        focused && "ring-2 ring-action-primary ring-offset-2 ring-offset-background-overlay rounded-[10px] ring-offset-[-2px]",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        className="size-full object-cover"
      />
    </article>
  );
}
