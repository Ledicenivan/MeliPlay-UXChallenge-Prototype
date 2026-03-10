import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { assets } from "@/assets/images";

export interface RecommendationCardProps {
  thumbnailSrc: string;
  recommendedBy?: string;
  quote?: string;
  title: string;
  year?: string;
  genre?: string;
  description?: string;
  className?: string;
  focused?: boolean;
  /** Set to -1 when card is wrapped in a focusable container (e.g. arrow-key nav) to avoid double tab stop */
  linkTabIndex?: number;
}

export function RecommendationCard({
  thumbnailSrc,
  recommendedBy = "Nombre",
  quote,
  title,
  year,
  genre,
  description,
  className,
  focused,
  linkTabIndex,
}: RecommendationCardProps) {
  return (
    <a
      href="#"
      tabIndex={linkTabIndex}
      className={cn(
        "flex h-[224px] shrink-0 cursor-pointer items-center rounded-[var(--radius-6)]",
        focused && "outline outline-2 outline-action-primary outline-offset-[-4px] rounded-[10px]",
        className
      )}
    >
      <div className="relative h-full w-[152px] shrink-0 overflow-hidden rounded-l-[var(--radius-6)] bg-background-primary">
        <img
          src={thumbnailSrc}
          alt=""
          className="size-full object-cover"
        />
      </div>
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-r-[var(--radius-6)] bg-background-overlay px-2 pt-2 pb-1 w-[280px]">
        <div className="flex flex-col gap-2">
          <p className="text-[length:var(--font-size-caption)] font-normal leading-4 tracking-[0.5px] text-[#f3f3f3]">
            Recomendación de
          </p>
          <div className="flex items-center gap-2">
            <Avatar size="small" src={assets.avatarSmall} alt="" />
            <p className="font-medium text-[14px] leading-[1.1] text-[#f3f3f3]">
              {recommendedBy}
            </p>
          </div>
          {quote && (
            <p className="line-clamp-3 font-normal text-[11px] leading-4 tracking-[0.5px] text-text-primary">
              {quote}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-[13px] leading-5 tracking-[0.1px] text-text-primary">
            {title}
          </p>
          {(year || genre) && (
            <p className="flex items-center gap-1 font-normal text-[length:var(--font-size-caption)] leading-4 tracking-[0.5px] text-text-subtle">
              {year}
              {year && genre && " · "}
              {genre}
            </p>
          )}
          {description && (
            <p className="line-clamp-2 font-normal text-[11px] leading-4 text-text-primary">
              {description}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}
