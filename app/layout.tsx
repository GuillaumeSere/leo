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
  metadataBase: new URL("https://leo-olive.netlify.app"),
  title: {
    default: "Les aventures de Léo | Vidéos drôles en famille",
    template: "%s | Les aventures de Léo",
  },
  description:
    "Découvrez les aventures de Léo, un enfant IA de 3 ans dans des vidéos drôles, des bêtises hilarantes et un univers familial plein d’humour.",
  keywords: [
    "vidéos comiques",
    "humour enfant",
    "personnage IA",
    "vidéos drôles",
    "divertissement famille",
    "aventures de Léo",
  ],
  authors: [{ name: "Les aventures de Léo" }],
  creator: "Les aventures de Léo",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  verification: {
    google: "hGMCr1W6D99RGbRgZ1WGKJuTdw_Mmqq7rlSObwX_1Ic",
  },
  openGraph: {
    title: "Les aventures de Léo | Vidéos drôles en famille",
    description:
      "Un univers fun rempli de vidéos drôles avec Léo et d’autres personnages créés par IA.",
    url: "/",
    siteName: "Les aventures de Léo",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/leo.png",
        width: 1200,
        height: 630,
        alt: "Léo, le personnage principal des aventures vidéo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Les aventures de Léo | Vidéos drôles en famille",
    description:
      "Regardez des vidéos hilarantes avec Léo et d’autres personnages IA dans un univers fun et familial.",
    images: ["/images/leo.png"],
  },
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
