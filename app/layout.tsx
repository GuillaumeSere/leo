import type { Metadata } from "next";
import { Fredoka, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Léo, le Petit Génie des Bêtises – Vidéos Drôles 😂",
  description: "Découvrez Léo, l’adorable enfant IA de 3 ans qui vit des situations hilarantes ! Des vidéos comiques, des bêtises inoubliables et de l’humour pour toute la famille.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${fredoka.variable} ${geistMono.variable} antialiased pt-16`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
