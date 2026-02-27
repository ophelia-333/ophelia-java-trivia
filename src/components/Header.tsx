import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-base-300 bg-base-100/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Avatar bubble */}
        <Link href="/" className="shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-base-100">
            <Image
              src="/ophelia-avatar.jpg"
              alt="Ophelia"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
        </Link>

        {/* Title */}
        <Link href="/" className="font-bold text-lg leading-tight hover:text-primary transition-colors">
          Ophelia&apos;s Quizzes
        </Link>
      </div>
    </header>
  );
}
