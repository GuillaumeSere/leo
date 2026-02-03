import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black p-4 nav flex justify-between">
      <Link href="/" className="text-2xl text-white font-bold">
        😂  Léo Show
      </Link>
    </nav>
  );
}
