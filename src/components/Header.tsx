import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-base-300 bg-base-100/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center">
        <Link href="/" className="font-bold text-lg leading-tight hover:text-primary transition-colors">
          Ophelia&apos;s Quizzes
        </Link>
      </div>
    </header>
  );
}
