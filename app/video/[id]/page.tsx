import { getVideoById } from "../../lib/youtube";

export default async function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  console.log("Params résolus:", resolvedParams);

  const video = await getVideoById(id);
  console.log("Video récupérée:", video);

  if (!video) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold">Vidéo introuvable 😢</h1>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-cover bg-center shadow-2xl bg-no-repeat py-20"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <div className="p-6 max-w-4xl mx-auto">
        {/* Iframe YouTube */}
        <div className="aspect-video mb-6">
          <iframe
            className="w-full h-full mt-30 rounded-xl"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            allowFullScreen
          />
        </div>

        {/* Titre et description */}
        <h1 className="text-2xl text-white font-bold">{video.title}</h1>
        <p className="text-gray-200">{video.description}</p>
      </div>
    </div>
  );
}

