import { Button } from "@/components/ui/button";
import { assets } from "@/assets/images";
import { Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[480px] w-full flex-col justify-end gap-8 pb-4 pt-[72px] pr-4 pl-4">
      {/* featuredThumbnail: anchored top-right, moves with window growth */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-[480px] w-[800px] overflow-hidden"
        aria-hidden
      >
        <img
          src={assets.featuredThumbnail}
          alt=""
          className="absolute inset-0 size-full object-cover object-right"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, rgba(26,26,26,0) 40%, var(--background-overlay) 100%), linear-gradient(180deg, rgba(26,26,26,0) 60%, var(--background-overlay) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex max-w-[640px] flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold leading-10 text-text-primary text-[length:var(--font-size-title-lg)] tracking-[-0.5px]">
              John Wick: Capítulo 4
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-[13px] font-semibold leading-5 tracking-[0.25px] text-text-primary">
              <span className="rounded bg-background-muted px-2 py-0.5 text-[length:var(--font-size-caption)] tracking-[0.5px]">
                +16
              </span>
              <span>Acción</span>
              <span>|</span>
              <span>2 h 49 min</span>
              <span>|</span>
              <span>2023</span>
            </div>
          </div>
          <p className="max-w-[640px] font-semibold leading-[26px] text-text-primary text-[length:var(--font-size-body-lg)] tracking-[0.5px]">
            John Wick descubre un camino para derrotar a la Alta Mesa. Pero
            antes de poder alcanzar su libertad, Wick debe enfrentarse a un nuevo
            enemigo con poderosas alianzas en todo el mundo y fuerzas que
            convierten a viejos amigos en enemigos.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="primary"
            size="default"
            data-focusable-main
            data-focus-row={0}
            data-focus-col={0}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-overlay"
          >
            <Play className="size-4 fill-current" />
            Ver ahora
          </Button>
          <Button
            variant="secondary"
            size="default"
            data-focusable-main
            data-focus-row={0}
            data-focus-col={1}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-overlay"
          >
            Más información
          </Button>
        </div>
      </div>
    </section>
  );
}
