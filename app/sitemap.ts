import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://leo-olive.netlify.app";

    return [
        {
            url: baseUrl,
            lastModified: new Date("2026-08-26"),
            changeFrequency: "daily",
            priority: 1,
        },
    ];
}
