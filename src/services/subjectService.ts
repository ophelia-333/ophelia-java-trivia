import subjectsData from "@/data/subjects.json";
import { Subject } from "@/types";

const subjects: Subject[] = subjectsData as Subject[];

export function getSubjects(): Subject[] {
  return subjects;
}

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}
