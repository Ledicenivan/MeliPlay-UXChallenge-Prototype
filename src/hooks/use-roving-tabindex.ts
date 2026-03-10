import { useRef, useCallback } from "react";

/**
 * Roving tabindex: arrow keys move focus between items, Enter activates.
 * Use on a container whose direct children are focusable (tabIndex 0 or -1).
 */
export function useRovingTabIndex(
  _itemCount: number,
  options?: { orientation?: "vertical" | "horizontal"; loop?: boolean }
) {
  const containerRef = useRef<HTMLElement | null>(null);
  const { orientation = "vertical", loop = true } = options ?? {};
  const isVertical = orientation === "vertical";

  const getFocusable = useCallback(() => {
    const container = containerRef.current;
    if (!container) return [];
    return Array.from(container.querySelectorAll<HTMLElement>("[data-nav-item]"));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = getFocusable();
      if (items.length === 0) return;
      const current = document.activeElement as HTMLElement | null;
      const index = current?.getAttribute("data-nav-index");
      const i = index != null ? parseInt(index, 10) : -1;

      if (e.key === "ArrowDown" || (isVertical && e.key === "ArrowRight")) {
        e.preventDefault();
        const next = i < items.length - 1 ? i + 1 : loop ? 0 : i;
        items[next]?.focus();
      } else if (e.key === "ArrowUp" || (isVertical && e.key === "ArrowLeft")) {
        e.preventDefault();
        const prev = i > 0 ? i - 1 : loop ? items.length - 1 : 0;
        items[prev]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        items[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        items[items.length - 1]?.focus();
      }
    },
    [getFocusable, isVertical, loop]
  );

  return { containerRef, handleKeyDown };
}
