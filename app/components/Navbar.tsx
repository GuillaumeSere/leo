import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-yellow-300 p-4 nav flex justify-between">
      <Link href="/" className="text-2xl text-white font-bold">
        😂  Léo <span className="text-black"> Show</span>
      </Link>
    </nav>
  );
}
