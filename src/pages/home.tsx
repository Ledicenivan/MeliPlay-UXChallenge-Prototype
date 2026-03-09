import { Sidebar } from "@/components/layout/sidebar";
import { Hero } from "@/components/home/hero";
import { Shelf } from "@/components/home/shelf";
import { ContentCard } from "@/components/home/content-card";
import { Top10Card } from "@/components/home/top10-card";
import { RecommendationCard } from "@/components/home/recommendation-card";
import { assets } from "@/assets/images";
import { Users } from "lucide-react";

export function HomePage() {
  return (
    <div className="flex min-h-screen w-full bg-background-overlay pl-0">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex flex-col">
          <Hero />

          <Shelf
            title="Recomendaciones de amigos"
            icon={<Users className="size-7" strokeWidth={1.5} />}
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
            />
            <ContentCard
              src={assets.thumbnails[1]}
              className="h-[224px] w-[144px]"
            />
            <ContentCard
              src={assets.thumbnails[2]}
              className="h-[224px] w-[144px]"
            />
          </Shelf>

          <Shelf title="Top 10 películas">
            {assets.thumbnails.slice(2, 12).map((src, i) => (
              <Top10Card
                key={i}
                rank={i + 1}
                src={src}
                focused={i === 0}
              />
            ))}
          </Shelf>

          <Shelf title="Próxima parada: Holliwood">
            {assets.thumbnails.slice(12, 22).map((src, i) => (
              <ContentCard
                key={i}
                src={src}
                focused={i === 0}
              />
            ))}
          </Shelf>

          <Shelf title="Elige tu próxima historia">
            {assets.thumbnails.slice(2, 12).map((src, i) => (
              <ContentCard key={i} src={src} />
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
