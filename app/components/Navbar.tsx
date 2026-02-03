import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-500 p-4 nav flex justify-between">
      <Link href="/" className="text-2xl text-white font-bold">
        😂  Léo <span className="text-yellow-300"> Show</span>
      </Link>
    </nav>
  );
}
