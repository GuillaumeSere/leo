"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getAllChannelVideos, getVideoById } from "../../lib/youtube";
import VideoCard from "../../components/VideoCard";
import { getRecommendations } from "../../lib/recommendations";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  description?: string;
  tags?: string[];
};

export default function VideoPage() {
  const params = useParams<{ id: string }>();
  const videoId = params?.id;

  const [video, setVideo] = useState<Video | null>(null);
  const [allVideos, setAllVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (!videoId) return;
    getVideoById(videoId).then((res) => setVideo(res));
  }, [videoId]);

  useEffect(() => {
    getAllChannelVideos().then((res) => setAllVideos(res));
  }, []);

  const recommendations = useMemo(() => {
    if (!video || allVideos.length === 0) return [];
    return getRecommendations(allVideos, video, 6);
  }, [video, allVideos]);

  if (!video) {
    return (
      <main className="w-full min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-600">Chargement de la vidéo...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white"
      style={{ backgroundImage: "url('/images/bg.png')" }}>
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <div className="bg-[#ffffff2e] rounded-md p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">
            {video.title}
          </h1>
          <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {video.tags && video.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {video.tags.slice(0, 12).map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] bg-linear-to-r from-pink-200 via-yellow-200 to-blue-200 text-black px-3 py-1 rounded-full border-2 border-white shadow-md font-extrabold tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {recommendations.length > 0 && (
          <div className="bg-[#ffffff2e] rounded-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-black">
              🎬 Tu pourrais aussi aimer
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recommendations.map((v) => (
                <VideoCard key={v.id} {...v} tags={v.tags ?? []} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
