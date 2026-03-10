import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ShelfProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Shelf({ title, icon, children, className }: ShelfProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-3.5 p-4 w-full",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span className="flex size-7 shrink-0 items-center justify-center text-text-primary">
            {icon}
          </span>
        )}
        <h2 className="font-semibold leading-7 text-text-primary text-[length:var(--font-size-title-sm)]">
          {title}
        </h2>
      </div>
      <div className="shelf-scroll flex gap-4 pb-2" data-shelf-scroll>
        {children}
      </div>
    </section>
  );
}
