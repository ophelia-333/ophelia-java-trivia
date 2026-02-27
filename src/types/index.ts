export type MatterType = "image" | "code" | "text";

export interface Matter {
  type: MatterType;
  content: string;
  language?: string; // for code snippets, e.g. "java"
}

export interface Alternative {
  id: "A" | "B" | "C" | "D";
  text: string;
}

export interface Question {
  id: string;
  subjectId: string;
  description: string;
  alternatives: Alternative[];
  correctAlternative: "A" | "B" | "C" | "D";
  explanation: string;
  matter?: Matter;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
}

export interface Subject {
  id: string;
  topicId: string;
  title: string;
  description: string;
}

export interface QuizAnswer {
  questionId: string;
  selected: "A" | "B" | "C" | "D";
  correct: boolean;
}
