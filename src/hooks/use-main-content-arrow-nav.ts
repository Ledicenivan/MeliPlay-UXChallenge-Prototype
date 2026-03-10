import { useCallback } from "react";

const FOCUSABLE_SELECTOR = "[data-focusable-main]";
const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

/**
 * Handles arrow-key navigation within main content: finds all [data-focusable-main]
 * in the container and moves focus on Arrow keys (Up/Left = prev, Down/Right = next).
 * Use on the main content container so keyboard users can move through cards/buttons.
 */
export function useMainContentArrowNav(
  containerRef: React.RefObject<HTMLElement | null>
) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!ARROW_KEYS.includes(e.key)) return;
      const container = containerRef.current;
      if (!container) return;

      const target = e.target as HTMLElement;
      const focusable = target.closest(FOCUSABLE_SELECTOR);
      if (!focusable || !container.contains(focusable)) return;

      const items = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (items.length === 0) return;

      const currentIndex = items.indexOf(focusable as HTMLElement);
      if (currentIndex === -1) return;

      const isNext = e.key === "ArrowDown" || e.key === "ArrowRight";
      const nextIndex = isNext
        ? (currentIndex + 1) % items.length
        : currentIndex === 0
          ? items.length - 1
          : currentIndex - 1;

      e.preventDefault();
      items[nextIndex]?.focus();
    },
    [containerRef]
  );

  return { handleKeyDown };
}
