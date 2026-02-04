"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllChannelVideos } from "../lib/youtube";
import VideoCard from "./VideoCard";
import { getRecommendations } from "../lib/recommendations";

type Video = {
    id: string;
    title: string;
    thumbnail: string;
    description?: string;
    tags?: string[];
};

type VideoWithTags = Video & {
    tags: string[];
};

export default function VideoGrid({ videos }: { videos: Video[] }) {
    const [favorites, setFavorites] = useState<VideoWithTags[]>([]);
    const [filterText, setFilterText] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const router = useRouter();

    const videosWithTags: VideoWithTags[] = useMemo(() => {
        return videos.map((video): VideoWithTags => {
            const tags = video.tags ?? [];
            return { ...video, tags };
        });
    }, [videos]);

    const availableTags = useMemo(() => {
        const counts = new Map<string, number>();
        videosWithTags.forEach((video) => {
            video.tags.forEach((tag) => {
                counts.set(tag, (counts.get(tag) ?? 0) + 1);
            });
        });

        return Array.from(counts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 12)
            .map(([tag]) => tag);
    }, [videosWithTags]);

    // Charger les favoris
    const loadFavorites = () => {
        const favIds: string[] = JSON.parse(
            localStorage.getItem("leo-favorites") || "[]"
        );
        const favVideos = videosWithTags.filter((v) => favIds.includes(v.id));
        setFavorites(favVideos);
    };

    useEffect(() => {
        loadFavorites();
        window.addEventListener("favoritesUpdated", loadFavorites);
        return () => window.removeEventListener("favoritesUpdated", loadFavorites);
    }, [videosWithTags]);

    // Filtrer les vidéos dynamiquement
    const filteredVideos = videosWithTags.filter((video) => {
        if (!filterText) return true; // aucun filtre
        const search = filterText.toLowerCase();
        return (
            video.title.toLowerCase().includes(search) ||
            (video.description?.toLowerCase().includes(search) ?? false) ||
            video.tags.some((tag) => tag.toLowerCase().includes(search))
        );
    });

    const filteredByTags = filteredVideos.filter((video) => {
        if (selectedTags.length === 0) return true;
        return selectedTags.some((tag) => video.tags.includes(tag));
    });

    const recommendations = useMemo(() => {
        if (videosWithTags.length < 2) return [];
        return getRecommendations(videosWithTags, videosWithTags[0], 6);
    }, [videosWithTags]);

    const toggleTag = (tagLabel: string) => {
        setSelectedTags((prev) =>
            prev.includes(tagLabel)
                ? prev.filter((t) => t !== tagLabel)
                : [...prev, tagLabel]
        );
    };

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

                {recommendations.length > 0 && (
                    <div className="bg-[#ffffff2e] rounded-md p-6">
                        <h2 className="text-2xl font-bold mb-6 text-white drop-shadow">
                            🎯 Propositions pour toi
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {recommendations.map((video) => (
                                <VideoCard key={video.id} {...video} tags={video.tags} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-[#ffffff2e] rounded-md p-6">
                    <div className="flex relative group justify-between">
                        <h2 className="text-2xl font-bold mb-4 text-white drop-shadow">
                            🎬 Toutes les aventures
                        </h2>
                        <button
                            onClick={handleSurprise}
                            className="mb-6 px-6 py-3 cursor-pointer bg-yellow-300 text-black font-bold rounded hover:bg-yellow-400 transition"
                        >
                            🎲
                        </button>
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            Surprends-moi
                        </span>
                    </div>

                    {/* Input de filtre dynamique */}
                    <input
                        type="text"
                        placeholder="Filtrer par mot-clé..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="w-full p-3 mb-6 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-300"
                    />

                    {availableTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            <button
                                type="button"
                                onClick={() => setSelectedTags([])}
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    selectedTags.length === 0
                                        ? "bg-yellow-300 text-black"
                                        : "bg-white/70 text-black"
                                }`}
                            >
                                Tous
                            </button>
                            {availableTags.map((tag) => {
                                const isActive = selectedTags.includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                                            isActive
                                                ? "bg-yellow-300 text-black"
                                                : "bg-white/70 text-black hover:bg-white"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-6">
                        {filteredByTags.map((video) => (
                            <VideoCard key={video.id} {...video} tags={video.tags} />
                        ))}
                        {filteredByTags.length === 0 && (
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
