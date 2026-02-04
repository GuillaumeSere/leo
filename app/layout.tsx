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
      keywords: [
    "vidéos comiques",
    "humour enfant",
    "personnage IA",
    "vidéos drôles",
    "divertissement famille",
  ],
  openGraph: {
    title: "Les aventures de Léo – Univers de vidéos comiques IA",
    description:
      "Un univers fun rempli de vidéos drôles avec Léo et d'autres personnages créés par IA.",
    images: ["/images/leo.png"],
    type: "website",
  },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <head>
                <meta name="google-site-verification" content="nwVPqsKRGvHVh9v-Qn4QoawQzNbN99Sfg6usOSlUEhg" />
                <meta name="description" content="Découvrez Les aventures de Léo, un univers de vidéos comiques avec un enfant IA et d'autres personnages drôles. Humour, bêtises et divertissement pour toute la famille !" />
                <meta name="keywords" content="vidéos comiques, humour enfant, personnage IA, vidéos drôles, divertissement famille, enfant virtuel, blagues vidéo, site humour" />

                <meta property="og:title" content="Les aventures de Léo – Univers de vidéos comiques IA" />
                <meta property="og:description" content="Un univers fun rempli de vidéos drôles avec Léo et d'autres personnages créés par IA. Rires garantis !" />
                <meta property="og:image" content="https://leo-olive.vercel.app/images/leo.png" />
                <meta property="og:url" content="https://leo-olive.vercel.app/" />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Les aventures de Léo – Vidéos comiques IA" />
                <meta name="twitter:description" content="Regardez des vidéos hilarantes avec Léo et d'autres personnages IA dans un univers fun et familial." />
                <meta name="twitter:image" content="https://leo-olive.vercel.app/images/leo.png" />
            </head>
            <body
                className={`${fredoka.variable} ${geistMono.variable} antialiased pt-16`}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
}
