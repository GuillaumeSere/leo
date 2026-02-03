import Link from "next/link";

type Props = {
  id: string;
  title: string;
  thumbnail: string;
};

export default function VideoCard({ id, title, thumbnail }: Props) {
  return (
    <Link href={`/video/${id}`}>
      <div className="bg-[#1f1f1f] cursor-pointer rounded-xl shadow hover:scale-105 transition overflow-hidden">
        <img src={thumbnail} alt={title} />
        <div className="p-3 text-white font-semibold">{title}</div>
      </div>
    </Link>
  );
}
