import questionsData from "@/data/questions.json";
import { Question } from "@/types";

const questions: Question[] = questionsData as Question[];

export function getQuestionsBySubject(subjectId: string): Question[] {
  return questions.filter((q) => q.subjectId === subjectId);
}

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}
