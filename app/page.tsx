"use client";

import { useState, useEffect, useMemo } from "react";
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
    const phrases = [
        "J'ai voulu aider... maintenant la télécommande est dans le frigo.",
        "Papa a dit non. J'ai dit re-non.",
        "J'ai pas fait de bêtise... j'ai innové.",
    ];
    const phraseDuJour = useMemo(() => {
        return phrases[Math.floor(Math.random() * phrases.length)];
    }, []);

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
                    <p className="mt-4 text-sm md:text-xl bg-[rgba(255,255,255,0.5)] p-1 rounded-md text-black font-bold drop-shadow max-w-xl">
                        Découvrez les vidéos comiques de Léo, notre enfant IA blond de 3 ans,
                        qui vit des aventures hilarantes et fait rire toute la famille, et d'autres vidéos !
                    </p>

                    {/* Petit encart personnage */}
                    <div className="mt-6 bg-[rgba(255,255,255,0.5)] p-3 rounded-md text-black font-semibold drop-shadow max-w-xl">
                        <p className="text-sm md:text-base">Aujourd’hui Léo dit :</p>
                        <p className="text-base md:text-lg italic">“{phraseDuJour}”</p>
                    </div>

                    {/* Barre de recherche */}
                    <div id="recherche" className="mt-8 w-full max-w-xl">
                        <SearchBar onSearch={(q) => setQuery(q)} />
                    </div>
                    <p className="mt-8 text-sm md:text-xl bg-[rgba(255,255,255,0.5)] p-1 rounded-md text-black font-bold drop-shadow max-w-xl">
                        Entre bêtises imprévues, situations absurdes et réactions trop mignonnes pour être vraies,
                        Léo transforme les petits moments du quotidien en scènes totalement déjantées.
                        Prépare-toi à sourire, rire… et peut-être même à te demander : "Mais qu’est-ce qu’il va encore inventer ?!" 😆
                    </p>
                </div>
            </section>

            {/* SECTION VIDEOS */}
            <section id="videos" className="background">
                {videos.length === 0 ? (
                    <p className="text-center text-gray-600 mt-6">Aucune vidéo trouvée 😢</p>
                ) : (
                    <VideoGrid videos={videos} />
                )}
            </section>
        </main>
    );
}
