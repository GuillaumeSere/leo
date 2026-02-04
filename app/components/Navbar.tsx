"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-yellow-300 p-4 nav">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl text-white font-bold">
          😂  Léo <span className="text-black"> Show</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-black font-semibold">
          <Link href="#recherche" className="hover:underline">
            Recherche
          </Link>
          <Link href="#videos" className="hover:underline">
            Vidéos
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden text-black font-semibold p-2 cursor-pointer rounded hover:bg-yellow-200"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 text-black font-semibold">
          <Link href="#recherche" className="hover:underline" onClick={() => setIsOpen(false)}>
            Recherche
          </Link>
          <Link href="#videos" className="hover:underline" onClick={() => setIsOpen(false)}>
            Vidéos
          </Link>
        </div>
      )}
    </nav>
  );
}
