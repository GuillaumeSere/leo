const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = "UCwJUclEDb0mP7bDpOgBtIBw";

async function fetchVideoTagsByIds(ids: string[]) {
  if (ids.length === 0) return {};

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ids.join(",")}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();
    if (!res.ok || !data.items) return {};

    const tagsById: Record<string, string[]> = {};
    data.items.forEach((item: any) => {
      tagsById[item.id] = item.snippet.tags ?? [];
    });

    return tagsById;
  } catch (error) {
    console.error("Erreur fetchVideoTagsByIds", error);
    return {};
  }
}

/**
 * Recherche des vidéos sur la chaîne YouTube par mot-clé
 */
export async function searchYoutubeVideos(query: string) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&q=${encodeURIComponent(
        query
      )}&type=video&order=date&maxResults=50&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();

    if (!res.ok || data.error) {
      console.error("YouTube API ERROR 👉", data);
      return [];
    }

    if (!data.items) {
      console.error("YouTube API returned no items 👉", data);
      return [];
    }

    const ids = data.items
      .map((item: any) => item.id.videoId)
      .filter(Boolean);
    const tagsById = await fetchVideoTagsByIds(ids);

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description, // ✅ récupère la description
      thumbnail: item.snippet.thumbnails.high.url,
      tags: tagsById[item.id.videoId] ?? [],
    }));
  } catch (error) {
    console.error("FETCH ERROR 👉", error);
    return [];
  }
}

/**
 * Récupère une seule vidéo par son ID
 */
export async function getVideoById(id: string) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();

    if (!res.ok || !data.items || data.items.length === 0) {
      console.error("YouTube API error or video not found:", data);
      return null;
    }

    const snippet = data.items[0].snippet;

    return {
      id,
      title: snippet.title,
      description: snippet.description,
      thumbnail: snippet.thumbnails.high.url,
      tags: snippet.tags ?? [],
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function getAllChannelVideos() {
  const maxResults = 50; // max 50 par requête

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=${maxResults}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();
    if (!res.ok || !data.items) return [];

    const ids = data.items
      .map((item: any) => item.id.videoId)
      .filter(Boolean);
    const tagsById = await fetchVideoTagsByIds(ids);

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      tags: tagsById[item.id.videoId] ?? [],
    }));
  } catch (err) {
    console.error("Erreur getAllChannelVideos", err);
    return [];
  }
}
