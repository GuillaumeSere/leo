"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
    id: string;
    title: string;
    thumbnail: string;
    tags?: string[];
};

export default function VideoCard({ id, title, thumbnail, tags = [] }: Props) {
    const [isFav, setIsFav] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("leo-favorites") || "[]");
        setIsFav(favs.includes(id));
    }, [id]);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault(); // empêche la redirection quand on clique sur le coeur
        e.stopPropagation();

        let favs = JSON.parse(localStorage.getItem("leo-favorites") || "[]");

        if (favs.includes(id)) {
            favs = favs.filter((v: string) => v !== id);
            setIsFav(false);
        } else {
            favs.push(id);
            setIsFav(true);
            setAnimate(true);
            setTimeout(() => setAnimate(false), 300);
        }

        localStorage.setItem("leo-favorites", JSON.stringify(favs));
        window.dispatchEvent(new Event("favoritesUpdated"));
    };

    return (
        <Link href={`/video/${id}`} className="block">
            <div className="bg-white/80 backdrop-blur rounded-xl overflow-hidden shadow-lg hover:scale-105 transition relative cursor-pointer">

                {/* Bouton coeur */}
                <button
                    onClick={toggleFavorite}
                    className="absolute top-2 right-2 text-2xl z-10 transition-transform duration-300"
                    style={{
                        transform: animate ? "scale(1.6)" : "scale(1)",
                    }}
                >
                    {isFav ? "❤️" : "🤍"}
                </button>


                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-48 object-cover"
                />

                <div className="p-3">
                    <div className="text-black text-sm">{title}</div>
                    {tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {tags.slice(0, 8).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[12px] bg-linear-to-r from-pink-200 via-yellow-200 to-blue-200 text-black px-3 py-1 rounded-full border-2 border-white shadow-md font-extrabold tracking-wide transition-transform hover:-rotate-1 hover:scale-105"
                                >
                                    {tag}
                                </span>
                            ))}
                            {tags.length > 8 && (
                                <span className="text-[12px] bg-white/80 text-black px-3 py-1 rounded-full border-2 border-white shadow-sm font-extrabold">
                                    +{tags.length - 8}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

