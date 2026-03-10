import { useCallback } from "react";

const SIDEBAR_SELECTOR = "[data-focusable-sidebar]";
const GRID_ROW_ATTR = "data-focus-row";
const GRID_COL_ATTR = "data-focus-col";
const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

type Grid = Map<number, Map<number, HTMLElement>>;

function buildContentGrid(container: HTMLElement): Grid {
  const grid: Grid = new Map();
  const elements = container.querySelectorAll<HTMLElement>(
    `[${GRID_ROW_ATTR}][${GRID_COL_ATTR}]`
  );
  elements.forEach((el) => {
    const row = parseInt(el.getAttribute(GRID_ROW_ATTR) ?? "-1", 10);
    const col = parseInt(el.getAttribute(GRID_COL_ATTR) ?? "-1", 10);
    if (row < 0 || col < 0) return;
    if (!grid.has(row)) grid.set(row, new Map());
    grid.get(row)!.set(col, el);
  });
  return grid;
}

function getGridRows(grid: Grid): number[] {
  return Array.from(grid.keys()).sort((a, b) => a - b);
}

/**
 * 2D + sidebar navigation:
 * - Content has data-focus-row and data-focus-col: Arrow Up/Down move between shelves (same column), Arrow Left/Right within shelf.
 * - Sidebar has data-focusable-sidebar: Arrow Up/Down move within sidebar. Arrow Right goes to content (0,0).
 * - Arrow Left from content column 0 goes to last sidebar item.
 */
export function usePageArrowNav(
  containerRef: React.RefObject<HTMLElement | null>
) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!ARROW_KEYS.includes(e.key)) return;
      const container = containerRef.current;
      if (!container) return;

      const target = e.target as HTMLElement;

      // Sidebar: vertical list
      const inSidebar = target.closest(SIDEBAR_SELECTOR);
      if (inSidebar) {
        const sidebarItems = Array.from(
          container.querySelectorAll<HTMLElement>(SIDEBAR_SELECTOR)
        );
        if (sidebarItems.length === 0) return;
        const idx = sidebarItems.indexOf(inSidebar as HTMLElement);
        if (idx === -1) return;

        if (e.key === "ArrowRight") {
          const grid = buildContentGrid(container);
          const rows = getGridRows(grid);
          const firstRow = rows[0];
          if (firstRow !== undefined) {
            const firstRowCells = grid.get(firstRow)!;
            const minCol = Math.min(...firstRowCells.keys());
            const first = firstRowCells.get(minCol);
            if (first) {
              e.preventDefault();
              first.focus();
            }
          }
          return;
        }
        if (e.key === "ArrowDown" && idx < sidebarItems.length - 1) {
          e.preventDefault();
          sidebarItems[idx + 1].focus();
          return;
        }
        if (e.key === "ArrowUp" && idx > 0) {
          e.preventDefault();
          sidebarItems[idx - 1].focus();
          return;
        }
        if (e.key === "ArrowLeft") {
          // optional: from first sidebar item go to last content col? or do nothing
        }
        return;
      }

      // Content: 2D grid
      const rowAttr = target.getAttribute(GRID_ROW_ATTR);
      const colAttr = target.getAttribute(GRID_COL_ATTR);
      if (rowAttr === null || colAttr === null) return;

      const row = parseInt(rowAttr, 10);
      const col = parseInt(colAttr, 10);
      const grid = buildContentGrid(container);
      const rows = getGridRows(grid);
      if (rows.length === 0) return;

      if (e.key === "ArrowLeft") {
        if (col > 0) {
          const rowMap = grid.get(row);
          const prev = rowMap?.get(col - 1);
          if (prev) {
            e.preventDefault();
            prev.focus();
          }
        } else {
          const sidebarItems = Array.from(
            container.querySelectorAll<HTMLElement>(SIDEBAR_SELECTOR)
          );
          if (sidebarItems.length > 0) {
            e.preventDefault();
            sidebarItems[sidebarItems.length - 1].focus();
          }
        }
        return;
      }

      if (e.key === "ArrowRight") {
        const rowMap = grid.get(row);
        const nextCol = col + 1;
        const next = rowMap?.get(nextCol);
        if (next) {
          e.preventDefault();
          next.focus();
        }
        return;
      }

      if (e.key === "ArrowDown") {
        const currentRowIndex = rows.indexOf(row);
        const nextRowIndex = currentRowIndex + 1;
        if (nextRowIndex < rows.length) {
          const nextRow = rows[nextRowIndex];
          const nextRowMap = grid.get(nextRow)!;
          const maxColInRow = Math.max(...nextRowMap.keys());
          const clampedCol = Math.min(col, maxColInRow);
          const next = nextRowMap.get(clampedCol);
          if (next) {
            e.preventDefault();
            next.focus();
          }
        }
        return;
      }

      if (e.key === "ArrowUp") {
        const currentRowIndex = rows.indexOf(row);
        const prevRowIndex = currentRowIndex - 1;
        if (prevRowIndex >= 0) {
          const prevRow = rows[prevRowIndex];
          const prevRowMap = grid.get(prevRow)!;
          const maxColInRow = Math.max(...prevRowMap.keys());
          const clampedCol = Math.min(col, maxColInRow);
          const prev = prevRowMap.get(clampedCol);
          if (prev) {
            e.preventDefault();
            prev.focus();
          }
        }
        return;
      }
    },
    [containerRef]
  );

  return { handleKeyDown };
}
