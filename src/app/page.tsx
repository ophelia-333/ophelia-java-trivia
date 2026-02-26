import Link from "next/link";
import { getSubjects } from "@/services/subjectService";

export default function HomePage() {
  const subjects = getSubjects();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">
            Ophelia&apos;s Java Trivia
          </h1>
          <p className="text-base-content/60 text-lg">
            Selecione um tema para começar o quiz
          </p>
        </div>

        {/* Subject cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/quiz/${subject.id}`}
              className="card bg-base-200 hover:bg-base-300 border border-base-300 hover:border-primary transition-all duration-200 cursor-pointer"
            >
              <div className="card-body">
                <h2 className="card-title text-lg">{subject.title}</h2>
                <p className="text-base-content/60 text-sm">
                  {subject.description}
                </p>
                <div className="card-actions justify-end mt-2">
                  <span className="badge badge-primary badge-outline">
                    Iniciar →
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
