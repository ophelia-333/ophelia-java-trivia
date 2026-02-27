import Link from "next/link";
import { getTopics } from "@/services/topicService";

const topicIcons: Record<string, string> = {
  java: "☕",
  cybersecurity: "🔒",
};

export default function HomePage() {
  const topics = getTopics();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Ophelia&apos;s Quizzes</h1>
          <p className="text-base-content/60 text-lg">
            Pick a topic to get started
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
