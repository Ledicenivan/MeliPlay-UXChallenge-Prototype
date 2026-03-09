import { cn } from "@/lib/utils";

export interface Top10CardProps {
  rank: number;
  src: string;
  alt?: string;
  className?: string;
  /** Design system state: default (number hidden) or focus (number visible, yellow, ring) */
  focused?: boolean;
}

export function Top10Card({
  rank,
  src,
  alt = "",
  className,
  focused = false,
}: Top10CardProps) {
  return (
    <article
      className={cn(
        "relative h-[224px] w-[205px] shrink-0 rounded-[var(--radius-6)]",
        "overflow-visible",
        focused && "ring-2 ring-action-primary ring-offset-2 ring-offset-background-overlay rounded-[10px] ring-offset-[-2px]",
        className
      )}
    >
      {/* Rank number: left-aligned, baseline at bottom; visible only in focus state */}
      <span
        className={cn(
          "absolute left-0 bottom-0 flex h-[144px] items-end font-bold leading-none tracking-[-30px] text-[144px]",
          focused ? "text-text-accent" : "text-transparent"
        )}
        aria-hidden
      >
        {rank}
      </span>
      {/* Image: right part only, clip overflow */}
      <div className="absolute inset-y-0 left-[61px] right-0 overflow-hidden rounded-r-[var(--radius-6)] bg-background-primary">
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
        />
      </div>
    </article>
  );
}
