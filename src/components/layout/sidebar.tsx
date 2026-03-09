import { useState } from "react";
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

type NavItemState = "default" | "hover" | "focus" | "active-search" | "active-page";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activePageId = "home";
  const activeSearchId = "search";
  const { containerRef, handleKeyDown } = useRovingTabIndex(navItems.length, {
    orientation: "vertical",
    loop: true,
  });

  const getItemState = (id: string, index: number): NavItemState => {
    if (id === activeSearchId) return "active-search";
    if (id === activePageId) return "active-page";
    if (focusedIndex === index) return "focus";
    if (hoveredId === id) return "hover";
    return "default";
  };

  return (
    <aside
      ref={containerRef}
      role="navigation"
      aria-label="Navegación principal"
      onKeyDown={handleKeyDown}
      className={cn(
        "sticky top-0 z-10 flex shrink-0 flex-col bg-gradient-to-r from-background-overlay from-20% to-transparent",
        isOpen ? "w-[160px] gap-6 p-6" : "w-[80px] gap-4 p-4"
      )}
    >
      {/* Profile: Collapsed = avatar only, Open = avatar + name */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen((o) => !o);
          }
        }}
        className="flex items-center gap-2 rounded-[var(--radius-6)] text-left outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-overlay"
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

      <nav className="flex flex-col gap-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const state = getItemState(item.id, index);
          const isActiveSearch = state === "active-search";
          const isActivePage = state === "active-page";
          const isFocused = state === "focus";

          return (
            <a
              key={item.id}
              href="#"
              data-nav-item
              data-nav-index={index}
              tabIndex={focusedIndex === index || (focusedIndex === null && index === 0) ? 0 : -1}
              onFocus={() => setFocusedIndex(index)}
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
                  // Navigate or trigger action
                }
              }}
              className={cn(
                "relative flex items-center gap-2 rounded-[var(--radius-6)] px-2.5 py-2.5 text-left font-semibold text-[length:var(--font-size-body)] tracking-[0.1px] transition-colors outline-none",
                "focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-overlay",
                isActiveSearch &&
                  "bg-background-secondary text-text-inverse",
                !isActiveSearch && "text-text-primary",
                !isActiveSearch &&
                  (isActivePage || state === "hover" || isFocused) &&
                  "bg-background-primary/80"
              )}
              aria-current={item.id === activePageId ? "page" : undefined}
            >
              {isActivePage && (
                <span
                  className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-action-primary"
                  aria-hidden
                />
              )}
              <Icon className="size-5 shrink-0" strokeWidth={1.5} aria-hidden />
              {isOpen && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
