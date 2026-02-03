"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  onSearch?: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    // Met à jour le parent si besoin
    if (onSearch) onSearch(input);

    // Redirection vers la page avec le paramètre search
    router.push(`/?search=${encodeURIComponent(input)}`);

    // Faire descendre la page de 200px pour que le contenu soit visible
    window.scrollBy({ top: 200, behavior: "smooth" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        placeholder="Rechercher une vidéo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      />
      <button
        type="submit"
        className="bg-yellow-300 text-black px-4 rounded-r-lg font-bold hover:bg-yellow-400 transition"
      >
        🔍
      </button>
    </form>
  );
}


