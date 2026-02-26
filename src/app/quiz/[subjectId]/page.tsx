import { notFound } from "next/navigation";
import { getSubjectById } from "@/services/subjectService";
import { getQuestionsBySubject } from "@/services/questionService";
import QuizClient from "./QuizClient";

interface Props {
  params: Promise<{ subjectId: string }>;
}

export default async function QuizPage({ params }: Props) {
  const { subjectId } = await params;
  const subject = getSubjectById(subjectId);

  if (!subject) {
    notFound();
  }

  const questions = getQuestionsBySubject(subjectId);

  if (questions.length === 0) {
    notFound();
  }

  return <QuizClient subject={subject} questions={questions} />;
}
