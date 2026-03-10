import { useRef, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Hero } from "@/components/home/hero";
import { Shelf } from "@/components/home/shelf";
import { ContentCard } from "@/components/home/content-card";
import { Top10Card } from "@/components/home/top10-card";
import { RecommendationCard } from "@/components/home/recommendation-card";
import { assets } from "@/assets/images";
import { Users } from "lucide-react";
import { usePageArrowNav } from "@/hooks/use-page-arrow-nav";
import { cn } from "@/lib/utils";

const focusableCardWrapperClass =
  "shrink-0 rounded-[var(--radius-6)] outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-overlay";

export function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { handleKeyDown: handlePageKeyDown } = usePageArrowNav(pageRef);

  // Start with focus on "Ver ahora" (hero primary button)
  useEffect(() => {
    const verAhora = pageRef.current?.querySelector<HTMLElement>(
      "[data-focus-row=\"0\"][data-focus-col=\"0\"]"
    );
    verAhora?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      ref={pageRef}
      onKeyDownCapture={handlePageKeyDown}
      className="flex min-h-screen w-full bg-background-overlay pl-0"
    >
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex flex-col">
          <Hero />

          <Shelf
            title="Recomendaciones de amigos"
            icon={<Users className="size-7" strokeWidth={1.5} />}
          >
            <div
              tabIndex={0}
              data-focusable-main
              data-focus-row={1}
              data-focus-col={0}
              className={cn(focusableCardWrapperClass, "cursor-pointer")}
            >
              <RecommendationCard
                thumbnailSrc={assets.thumbnails[0]}
                recommendedBy="Nombre"
                quote="Lorem ipsum dolor sit amet consectetur. Tristique et at orci pulvinar at. Id arcu pharetra massa sit sodales nam est sed mi."
                title="Nombre del Contenido"
                year="2024"
                genre="Drama"
                description="Lorem ipsum dolor sit amet consectetur. Tristique et at orci pulvinar at."
                focused
                linkTabIndex={-1}
              />
            </div>
            <div tabIndex={0} data-focusable-main data-focus-row={1} data-focus-col={1} className={focusableCardWrapperClass}>
              <ContentCard
                src={assets.thumbnails[1]}
                className="h-[224px] w-[144px]"
              />
            </div>
            <div tabIndex={0} data-focusable-main data-focus-row={1} data-focus-col={2} className={focusableCardWrapperClass}>
              <ContentCard
                src={assets.thumbnails[2]}
                className="h-[224px] w-[144px]"
              />
            </div>
          </Shelf>

          <Shelf title="Top 10 películas">
            {assets.thumbnails.slice(2, 12).map((src, i) => (
              <div
                key={i}
                tabIndex={0}
                data-focusable-main
                data-focus-row={2}
                data-focus-col={i}
                className={focusableCardWrapperClass}
              >
                <Top10Card
                  rank={i + 1}
                  src={src}
                  focused={i === 0}
                />
              </div>
            ))}
          </Shelf>

          <Shelf title="Próxima parada: Holliwood">
            {assets.thumbnails.slice(12, 22).map((src, i) => (
              <div
                key={i}
                tabIndex={0}
                data-focusable-main
                data-focus-row={3}
                data-focus-col={i}
                className={focusableCardWrapperClass}
              >
                <ContentCard
                  src={src}
                  focused={i === 0}
                />
              </div>
            ))}
          </Shelf>

          <Shelf title="Elige tu próxima historia">
            {assets.thumbnails.slice(2, 12).map((src, i) => (
              <div
                key={i}
                tabIndex={0}
                data-focusable-main
                data-focus-row={4}
                data-focus-col={i}
                className={focusableCardWrapperClass}
              >
                <ContentCard src={src} />
              </div>
            ))}
          </Shelf>

          <div className="h-[298px] shrink-0 w-full" aria-hidden />
        </div>
      </main>

      {/* Mercado Play logo - bottom right */}
      <div
        className="pointer-events-none fixed bottom-8 right-8 z-20 h-12 w-[134px] drop-shadow-lg"
        aria-hidden
      >
        <img
          src={assets.logo}
          alt="Mercado Play"
          className="size-full object-contain object-right"
        />
      </div>
    </div>
  );
}
