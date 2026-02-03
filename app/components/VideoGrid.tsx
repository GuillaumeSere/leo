import VideoCard from "./VideoCard";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

export default function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="w-full bg-cover bg-center shadow-2xl bg-no-repeat py-12"
         style={{ backgroundImage: "url('/images/bg.png')" }}>
      <div className="max-w-6xl bg-[#ffffff2e] rounded-md mx-auto grid md:grid-cols-3 gap-6 p-6">
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}

