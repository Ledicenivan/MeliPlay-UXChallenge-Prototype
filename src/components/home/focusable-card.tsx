import { useState, type ReactElement, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

export interface FocusableCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactElement<{ focused?: boolean }>;
}

/**
 * Wraps a content card (ContentCard, Top10Card, RecommendationCard) and passes
 * `focused={true}` when the wrapper has focus, so the card can show its design-system Focus state.
 */
export function FocusableCard({
  children,
  className,
  onFocus,
  onBlur,
  ...rest
}: FocusableCardProps) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const child = isValidElement(children)
    ? cloneElement(children as ReactElement<{ focused?: boolean }>, { focused })
    : children;

  return (
    <div
      className={cn(
        "shrink-0 rounded-[var(--radius-6)] outline-none cursor-pointer",
        className
      )}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    >
      {child}
    </div>
  );
}
