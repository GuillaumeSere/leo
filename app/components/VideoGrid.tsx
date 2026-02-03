"use client";

import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [favorites, setFavorites] = useState<Video[]>([]);

  const loadFavorites = () => {
    const favIds: string[] = JSON.parse(
      localStorage.getItem("leo-favorites") || "[]"
    );
    const favVideos = videos.filter((v) => favIds.includes(v.id));
    setFavorites(favVideos);
  };

  useEffect(() => {
    loadFavorites(); // au chargement

    // 👂 écoute les changements
    window.addEventListener("favoritesUpdated", loadFavorites);
    return () => window.removeEventListener("favoritesUpdated", loadFavorites);
  }, [videos]);

  return (
    <div
      className="w-full bg-cover bg-center shadow-2xl bg-no-repeat py-12"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <div className="max-w-6xl mx-auto space-y-12 px-6">

        {favorites.length > 0 && (
          <div className="bg-[#ffffff2e] rounded-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-yellow-300 drop-shadow">
              ⭐ Tes vidéos préférées
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {favorites.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </div>
        )}

        <div className="bg-[#ffffff2e] rounded-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-white drop-shadow">
            🎬 Toutes les aventures
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

