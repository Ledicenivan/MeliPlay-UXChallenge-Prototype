import { useRef, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Hero } from "@/components/home/hero";
import { Shelf } from "@/components/home/shelf";
import { ContentCard } from "@/components/home/content-card";
import { Top10Card } from "@/components/home/top10-card";
import { RecommendationCard } from "@/components/home/recommendation-card";
import { FocusableCard } from "@/components/home/focusable-card";
import { assets } from "@/assets/images";
import { Users } from "lucide-react";
import { usePageArrowNav } from "@/hooks/use-page-arrow-nav";

const focusableCardWrapperClass =
  "shrink-0 outline-none cursor-pointer";

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
            <FocusableCard
              tabIndex={0}
              data-focusable-main
              data-focus-row={1}
              data-focus-col={0}
              className={focusableCardWrapperClass}
            >
              <RecommendationCard
                thumbnailSrc={assets.thumbnails[0]}
                recommendedBy="Nombre"
                quote="Lorem ipsum dolor sit amet consectetur. Tristique et at orci pulvinar at. Id arcu pharetra massa sit sodales nam est sed mi."
                title="Nombre del Contenido"
                year="2024"
                genre="Drama"
                description="Lorem ipsum dolor sit amet consectetur. Tristique et at orci pulvinar at."
                linkTabIndex={-1}
              />
            </FocusableCard>
            <FocusableCard
              tabIndex={0}
              data-focusable-main
              data-focus-row={1}
              data-focus-col={1}
              className={focusableCardWrapperClass}
            >
              <RecommendationCard
                thumbnailSrc={assets.thumbnails[1]}
                recommendedBy="Nombre"
                quote="Lorem ipsum dolor sit amet consectetur. Tristique et at orci pulvinar at. Id arcu pharetra massa sit sodales nam est sed mi."
                title="Nombre del Contenido"
                year="2024"
                genre="Drama"
                description="Lorem ipsum dolor sit amet consectetur. Tristique et at orci pulvinar at."
                linkTabIndex={-1}
              />
            </FocusableCard>
            <FocusableCard
              tabIndex={0}
              data-focusable-main
              data-focus-row={1}
              data-focus-col={2}
              className={focusableCardWrapperClass}
            >
              <RecommendationCard
                thumbnailSrc={assets.thumbnails[2]}
                recommendedBy="Nombre"
                quote="Lorem ipsum dolor sit amet consectetur. Tristique et at orci pulvinar at. Id arcu pharetra massa sit sodales nam est sed mi."
                title="Nombre del Contenido"
                year="2024"
                genre="Drama"
                description="Lorem ipsum dolor sit amet consectetur. Tristique et at orci pulvinar at."
                linkTabIndex={-1}
              />
            </FocusableCard>
          </Shelf>

          <Shelf title="Top 10 películas">
            {assets.thumbnails.slice(2, 12).map((src, i) => (
              <FocusableCard
                key={i}
                tabIndex={0}
                data-focusable-main
                data-focus-row={2}
                data-focus-col={i}
                className={focusableCardWrapperClass}
              >
                <Top10Card rank={i + 1} src={src} />
              </FocusableCard>
            ))}
          </Shelf>

          <Shelf title="Próxima parada: Holliwood">
            {assets.thumbnails.slice(12, 22).map((src, i) => (
              <FocusableCard
                key={i}
                tabIndex={0}
                data-focusable-main
                data-focus-row={3}
                data-focus-col={i}
                className={focusableCardWrapperClass}
              >
                <ContentCard src={src} />
              </FocusableCard>
            ))}
          </Shelf>

          <Shelf title="Elige tu próxima historia">
            {assets.thumbnails.slice(2, 12).map((src, i) => (
              <FocusableCard
                key={i}
                tabIndex={0}
                data-focusable-main
                data-focus-row={4}
                data-focus-col={i}
                className={focusableCardWrapperClass}
              >
                <ContentCard src={src} />
              </FocusableCard>
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
