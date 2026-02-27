import Link from "next/link";
import Image from "next/image";
import { getTopics } from "@/services/topicService";

const topicIcons: Record<string, string> = {
  java: "☕",
  cybersecurity: "🔒",
};

export default function HomePage() {
  const topics = getTopics();

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12">
      <div className="max-w-2xl w-full">

        {/* Hero — Ophelia professor */}
        <div className="flex flex-col items-center mb-12">
          <div className="ophelia-float relative w-56 h-56 sm:w-72 sm:h-72 mb-6">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl ophelia-glow" />
            <Image
              src="/ophelia-professor.jpg"
              alt="Ophelia"
              fill
              className="object-cover rounded-2xl ring-2 ring-primary/60 relative z-10"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-center">Ophelia&apos;s Quizzes</h1>
          <p className="text-base-content/60 text-lg text-center">
            Pick a topic. Prove you know your stuff.
          </p>
        </div>

        {/* Topic cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/topic/${topic.id}`}
              className="card bg-base-200 hover:bg-base-300 border border-base-300 hover:border-primary transition-all duration-200 cursor-pointer"
            >
              <div className="card-body">
                <h2 className="card-title text-lg">
                  <span className="text-2xl">{topicIcons[topic.id] ?? "📚"}</span>
                  {topic.title}
                </h2>
                <p className="text-base-content/60 text-sm">
                  {topic.description}
                </p>
                <div className="card-actions justify-end mt-2">
                  <span className="badge badge-primary badge-outline">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}
