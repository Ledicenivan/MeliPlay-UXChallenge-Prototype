import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { assets } from "@/assets/images";
import {
  Search,
  Home,
  Clapperboard,
  Film,
  Settings,
} from "lucide-react";
import { useRovingTabIndex } from "@/hooks/use-roving-tabindex";

const navItems = [
  { id: "search", label: "Buscar", icon: Search },
  { id: "home", label: "Inicio", icon: Home },
  { id: "series", label: "Series", icon: Clapperboard },
  { id: "movies", label: "Películas", icon: Film },
  { id: "settings", label: "Configuración", icon: Settings },
] as const;

/** Design system: Default | Hover | Active */
type NavItemState = "default" | "hover" | "active";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activePageId = "home";
  const asideRef = useRef<HTMLElement>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { containerRef } = useRovingTabIndex(
    navItems.length + 1,
    { orientation: "vertical", loop: true }
  );

  const handleSidebarFocus = useCallback(() => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleSidebarBlur = useCallback(() => {
    blurTimeoutRef.current = setTimeout(() => {
      const active = document.activeElement as Node | null;
      if (asideRef.current && active && !asideRef.current.contains(active)) {
        setIsOpen(false);
      }
      blurTimeoutRef.current = null;
    }, 0);
  }, []);

  const getItemState = (id: string, index: number): NavItemState => {
    if (id === activePageId) return "active";
    if (focusedIndex === index + 1 || hoveredId === id) return "hover";
    return "default";
  };

  return (
    <>
      {/* When open: gradient overlay half the page (solid left, then fade) */}
      {isOpen && (
        <div
          aria-hidden
          className="fixed inset-y-0 left-0 z-20 w-1/2 pointer-events-none bg-gradient-to-r from-background-overlay from-[40%] to-transparent"
        />
      )}

      <aside
        ref={(el) => {
          (containerRef as React.MutableRefObject<HTMLElement | null>).current = el;
          (asideRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }}
        role="navigation"
        aria-label="Navegación principal"
        onFocusCapture={handleSidebarFocus}
        onBlurCapture={handleSidebarBlur}
        className={cn(
          "flex h-screen shrink-0 flex-col pt-6 pl-6 gap-[156px]",
          isOpen
            ? "fixed left-0 top-0 z-20 w-1/2 bg-transparent"
            : "sticky top-0 z-10 w-[96px] bg-gradient-to-r from-background-overlay from-20% to-transparent"
        )}
      >
        {/* Profile: always selectable (tabIndex 0); opens navbar when focused */}
        <button
          type="button"
          data-nav-item
          data-nav-index="0"
          data-focusable-sidebar
          tabIndex={0}
          onFocus={() => setFocusedIndex(0)}
          onBlur={() => setFocusedIndex(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen((o) => !o);
            }
          }}
          onClick={() => setIsOpen((o) => !o)}
          className="flex cursor-pointer items-center gap-2 rounded-[var(--radius-6)] text-left outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-overlay"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Contraer menú" : "Expandir menú"}
        >
          <Avatar size="large" src={assets.avatarDefault} alt="Usuario" />
          {isOpen && (
            <span className="font-semibold text-text-primary text-[length:var(--font-size-body)] tracking-[0.1px] whitespace-nowrap">
              Iván Jiménez
            </span>
          )}
        </button>

        <nav className={cn("flex flex-col gap-1", isOpen && "w-[160px]")}>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const state = getItemState(item.id, index);
            const isActive = state === "active";
            const isHover = state === "hover";

            return (
              <a
                key={item.id}
                href={item.id === "search" ? "#" : "#"}
                data-nav-item
                data-nav-index={index + 1}
                data-focusable-sidebar
                tabIndex={focusedIndex === index + 1 ? 0 : -1}
                onFocus={() => setFocusedIndex(index + 1)}
                onBlur={() => setFocusedIndex(null)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(e) => {
                  if (item.id === "search") e.preventDefault();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (item.id === "search") return;
                  }
                }}
                className={cn(
                  "relative flex cursor-pointer items-center gap-2 rounded-[var(--radius-6)] p-2.5 text-left font-semibold text-[length:var(--font-size-body)] tracking-[0.1px] transition-colors outline-none",
                  "focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-overlay",
                  /* Default: white text, no background */
                  !isActive && !isHover && "text-text-primary",
                  /* Hover (only when not current page): yellow background, black foreground */
                  isHover && !isActive && "bg-action-primary text-text-inverse",
                  /* Active (design system): no fill, white foreground, yellow indicator only */
                  isActive && "text-text-primary"
                )}
                aria-current={item.id === activePageId ? "page" : undefined}
              >
                {isActive && (
                  <span
                    className="absolute left-0 top-0 bottom-0 w-[2px] rounded-[1px] bg-action-primary"
                    aria-hidden
                  />
                )}
                <Icon
                  className="size-5 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden
                />
                {isOpen && <span>{item.label}</span>}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
