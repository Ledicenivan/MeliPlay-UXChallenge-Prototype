import { cn } from "@/lib/utils";

export interface Top10CardProps {
  rank: number;
  src: string;
  alt?: string;
  className?: string;
  /** Design system: default (outlined gradient number) | focus (filled yellow number + ring around thumbnail) */
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
        "relative h-[224px] w-[205px] shrink-0 overflow-visible rounded-[var(--radius-6)]",
        className
      )}
    >
      {/* Rank: default = outlined + gradient fill; focus = filled yellow (design system) */}
      <span
        className={cn(
          "absolute left-0 bottom-0 flex h-[144px] items-end font-bold leading-none tracking-[-30px] text-[144px]",
          focused ? "text-text-accent" : "top10-number-outline"
        )}
        aria-hidden
      >
        {rank}
      </span>
      {/* Thumbnail: from 61px left; radius 6 on all 4 corners; focus ring around thumbnail only */}
      <div
        className={cn(
          "absolute inset-y-0 left-[61px] right-0 overflow-hidden rounded-[var(--radius-6)] bg-background-primary",
          focused &&
            "ring-2 ring-action-primary ring-offset-4 ring-offset-background-overlay rounded-[10px]"
        )}
      >
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
        />
      </div>
    </article>
  );
}
