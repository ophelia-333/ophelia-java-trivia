import { notFound } from "next/navigation";
import Link from "next/link";
import { getTopicById } from "@/services/topicService";
import { getSubjectsByTopic } from "@/services/subjectService";
import { getQuestionsBySubject } from "@/services/questionService";

interface Props {
  params: Promise<{ topicId: string }>;
}

export default async function TopicPage({ params }: Props) {
  const { topicId } = await params;
  const topic = getTopicById(topicId);

  if (!topic) {
    notFound();
  }

  const subjects = getSubjectsByTopic(topicId);
  const subjectsWithCount = subjects.map((subject) => ({
    subject,
    questionCount: getQuestionsBySubject(subject.id).length,
  }));

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Back + Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-base-content/50 hover:text-primary text-sm transition-colors mb-4 inline-block"
          >
            ← All Topics
          </Link>
          <h1 className="text-3xl font-bold">{topic.title}</h1>
          <p className="text-base-content/60 mt-1">{topic.description}</p>
        </div>

        {/* Subject cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subjectsWithCount.map(({ subject, questionCount }) => {
            const hasQuestions = questionCount > 0;

            return hasQuestions ? (
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
                  <div className="card-actions justify-between items-center mt-2">
                    <span className="text-xs text-base-content/40">
                      {questionCount} question{questionCount !== 1 ? "s" : ""}
                    </span>
                    <span className="badge badge-primary badge-outline">
                      Start →
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={subject.id}
                className="card bg-base-200 border border-base-300 opacity-60 cursor-not-allowed"
              >
                <div className="card-body">
                  <h2 className="card-title text-lg">{subject.title}</h2>
                  <p className="text-base-content/60 text-sm">
                    {subject.description}
                  </p>
                  <div className="card-actions justify-end mt-2">
                    <span className="badge badge-ghost">Coming Soon</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
