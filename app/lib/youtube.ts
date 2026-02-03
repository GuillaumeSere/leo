const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID ="UCwJUclEDb0mP7bDpOgBtIBw"; 

export async function searchYoutubeVideos(query: string) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&q=${encodeURIComponent(
        query
      )}&type=video&order=date&maxResults=50&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();

    // 🧨 Si l'API renvoie une erreur, on l'affiche
    if (!res.ok || data.error) {
      console.error("YouTube API ERROR 👉", data);
      return [];
    }

    // 🛡️ Protection si items n'existe pas
    if (!data.items) {
      console.error("YouTube API returned no items 👉", data);
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
    }));
  } catch (error) {
    console.error("FETCH ERROR 👉", error);
    return [];
  }
}
