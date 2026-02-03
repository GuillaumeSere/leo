"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllChannelVideos } from "../lib/youtube";
import VideoCard from "./VideoCard";

type Video = {
    id: string;
    title: string;
    thumbnail: string;
    description?: string;
};

export default function VideoGrid({ videos }: { videos: Video[] }) {
    const [favorites, setFavorites] = useState<Video[]>([]);
    const [filterText, setFilterText] = useState<string>("");

    const router = useRouter();

    // Charger les favoris
    const loadFavorites = () => {
        const favIds: string[] = JSON.parse(
            localStorage.getItem("leo-favorites") || "[]"
        );
        const favVideos = videos.filter((v) => favIds.includes(v.id));
        setFavorites(favVideos);
    };

    useEffect(() => {
        loadFavorites();
        window.addEventListener("favoritesUpdated", loadFavorites);
        return () => window.removeEventListener("favoritesUpdated", loadFavorites);
    }, [videos]);

    // Filtrer les vidéos dynamiquement
    const filteredVideos = videos.filter((video) => {
        if (!filterText) return true; // aucun filtre
        const search = filterText.toLowerCase();
        return (
            video.title.toLowerCase().includes(search) ||
            (video.description?.toLowerCase().includes(search) ?? false)
        );
    });

    const handleSurprise = async () => {
        const allVideos = await getAllChannelVideos();
        if (allVideos.length === 0) return;

        const randomIndex = Math.floor(Math.random() * allVideos.length);
        const randomVideo = allVideos[randomIndex];
        router.push(`/video/${randomVideo.id}`);
    };

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
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold mb-4 text-white drop-shadow">
                            🎬 Toutes les aventures
                        </h2>
                        <button
                            onClick={handleSurprise}
                            className="mb-6 px-6 py-3 cursor-pointer bg-yellow-300 text-black font-bold rounded hover:bg-yellow-400 transition"
                        >
                            🎲 Surprends-moi
                        </button>
                    </div>

                    {/* Input de filtre dynamique */}
                    <input
                        type="text"
                        placeholder="Filtrer par mot-clé..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="w-full p-3 mb-6 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-300"
                    />

                    <div className="grid md:grid-cols-3 gap-6">
                        {filteredVideos.map((video) => (
                            <VideoCard key={video.id} {...video} />
                        ))}
                        {filteredVideos.length === 0 && (
                            <p className="text-gray-200 col-span-full text-center">
                                Aucune vidéo ne correspond à votre recherche.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
