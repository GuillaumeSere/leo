export default async function VideoPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="w-full bg-cover bg-center shadow-2xl bg-no-repeat py-20"
            style={{ backgroundImage: "url('/images/bg.png')" }}>
            <div className="p-6 max-w-4xl mx-auto">
                <div className="aspect-video mb-6">
                    <iframe
                        className="w-full h-full mt-30 rounded-xl"
                        src={`https://www.youtube.com/embed/${id}`}
                        title="YouTube video player"
                        allowFullScreen
                    />
                </div>

                <h1 className="text-2xl text-white font-bold">Épisode de Léo</h1>
                <p className="text-gray-200">Encore une bêtise légendaire 😆</p>
            </div>
        </div>
    );
}
