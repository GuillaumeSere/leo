"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "./components/SearchBar";
import VideoGrid from "./components/VideoGrid";
import { searchYoutubeVideos } from "./lib/youtube";
import WaveText from "./components/WaveText";

export default function Home() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("search") || "funny kid";

  const [query, setQuery] = useState(initialQuery);
  const [videos, setVideos] = useState<any[]>([]);

  // Recherche automatique quand query change
  useEffect(() => {
    async function fetchVideos() {
      const res = await searchYoutubeVideos(query);
      setVideos(res);
    }
    fetchVideos();
  }, [query]);

  return (
    <main className="w-full">
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Image de fond */}
        <img
          src="/images/leo.png"
          alt="Léo IA"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay texte */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          {/* H1 animé */}
          <WaveText text="Les aventures de Léo" />

          {/* Petite description */}
          <p className="mt-4 text-lg md:text-xl bg-[rgba(255,255,255,0.5)] p-1 rounded-md text-black text-bold drop-shadow max-w-xl">
            Découvrez les vidéos comiques de Léo, notre enfant IA blond de 3 ans,
            qui vit des aventures hilarantes et fait rire toute la famille, et d'autres vidéos !
          </p>

          {/* Barre de recherche */}
          <div className="mt-8 w-full max-w-xl">
            <SearchBar onSearch={(q) => setQuery(q)} />
          </div>
        </div>
      </section>

      {/* SECTION VIDEOS */}
      <section className="background">
        {videos.length === 0 ? (
          <p className="text-center text-gray-600 mt-6">Aucune vidéo trouvée 😢</p>
        ) : (
          <VideoGrid videos={videos} />
        )}
      </section>
    </main>
  );
}

