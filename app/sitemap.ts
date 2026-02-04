import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://tonsite.com"; // ← remplace par ton vrai domaine

    // 🔥 Si tu as une liste d’IDs vidéos (ex: récupérées via API ou fichier)
    const videoIds = [
        "abc123",
        "def456",
        "ghi789",
    ]; // ← tu pourras automatiser plus tard

    const videoUrls = videoIds.map((id) => ({
        url: `${baseUrl}/video/${id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/#recherche`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/#videos`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        ...videoUrls,
    ];
}
