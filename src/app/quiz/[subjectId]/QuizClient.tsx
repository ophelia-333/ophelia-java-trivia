"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Question, Subject } from "@/types";

interface Answer {
  selected: "A" | "B" | "C" | "D";
  submitted: boolean;
  correct: boolean;
}

interface Props {
  subject: Subject;
  questions: Question[];
}

type Phase = "quiz" | "results";

export default function QuizClient({ subject, questions }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [phase, setPhase] = useState<Phase>("quiz");

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion?.id];
  const totalQuestions = questions.length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  function handleOptionClick(id: "A" | "B" | "C" | "D") {
    if (currentAnswer?.submitted) return; // locked after submit
    setSelectedOption(id);
  }

  function handleSubmit() {
    if (!selectedOption || currentAnswer?.submitted) return;
    const correct = selectedOption === currentQuestion.correctAlternative;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { selected: selectedOption, submitted: true, correct },
    }));
  }

  function handleNext() {
    if (isLastQuestion) {
      setPhase("results");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    }
  }

  function navigateToQuestion(index: number) {
    // Can navigate to answered questions or current
    if (index > currentIndex && !answers[questions[index]?.id]?.submitted) return;
    setCurrentIndex(index);
    const existing = answers[questions[index]?.id];
    setSelectedOption(existing?.selected ?? null);
  }

  // ── Results Screen ──────────────────────────────────────────────
  if (phase === "results") {
    const passed = correctCount / totalQuestions >= 0.5;
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full text-center">
          <div className="mb-6 relative w-64 h-64 mx-auto">
            <Image
              src={passed ? "/ophelia-happy.jpg" : "/ophelia-sad.jpg"}
              alt={passed ? "Ophelia celebrating" : "Ophelia disappointed"}
              fill
              className="object-contain rounded-2xl"
            />
          </div>

          <h2 className="text-3xl font-bold mb-2">
            {passed ? "Well done! 🎉" : "Not this time..."}
          </h2>

          <p className="text-base-content/60 text-lg mb-6">
            You got{" "}
            <span className="font-bold text-base-content">
              {correctCount} de {totalQuestions}
            </span>{" "}
            questions in{" "}
            <span className="font-semibold">{subject.title}</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn btn-ghost">
              ← Choose another topic
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => {
                setAnswers({});
                setCurrentIndex(0);
                setSelectedOption(null);
                setPhase("quiz");
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── Quiz Screen ─────────────────────────────────────────────────
  const submitted = currentAnswer?.submitted ?? false;
  const isCorrect = currentAnswer?.correct ?? false;
  const effectiveSelected = submitted ? currentAnswer?.selected : selectedOption;

  return (
    <main className="min-h-screen flex flex-col px-4 py-8">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">

        {/* Back link + subject title */}
        <div className="mb-6 flex items-center gap-2 text-sm text-base-content/50">
          <Link href="/" className="hover:text-base-content transition-colors">
            ← Home
          </Link>
          <span>/</span>
          <span className="text-base-content">{subject.title}</span>
        </div>

        {/* Stepper */}
        <div className="flex gap-2 flex-wrap mb-8">
          {questions.map((q, i) => {
            const ans = answers[q.id];
            const isAnswered = ans?.submitted;
            const isCurrent = i === currentIndex;
            const isFuture = i > currentIndex && !isAnswered;

            let btnClass = "btn btn-sm btn-circle ";
            if (isCurrent) btnClass += "btn-primary";
            else if (isAnswered && ans.correct) btnClass += "btn-success";
            else if (isAnswered && !ans.correct) btnClass += "btn-error";
            else btnClass += "btn-ghost btn-disabled opacity-30";

            return (
              <button
                key={q.id}
                className={btnClass}
                onClick={() => navigateToQuestion(i)}
                disabled={isFuture}
                aria-label={`Question ${i + 1}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Question card */}
        <div className="card bg-base-200 border border-base-300 flex-1">
          <div className="card-body gap-6">

            {/* Matter (code snippet / image) */}
            {currentQuestion.matter && (
              <div className="rounded-lg overflow-hidden">
                {currentQuestion.matter.type === "code" ? (
                  <pre className="bg-base-300 text-sm p-4 rounded-lg overflow-x-auto">
                    <code>{currentQuestion.matter.content}</code>
                  </pre>
                ) : currentQuestion.matter.type === "image" ? (
                  <Image
                    src={currentQuestion.matter.content}
                    alt="Question content"
                    width={600}
                    height={300}
                    className="rounded-lg w-full object-cover"
                  />
                ) : (
                  <p className="text-base-content/70 italic">
                    {currentQuestion.matter.content}
                  </p>
                )}
              </div>
            )}

            {/* Question text */}
            <p className="text-lg font-medium leading-relaxed">
              {currentQuestion.description}
            </p>

            {/* Alternatives */}
            <div className="flex flex-col gap-3">
              {currentQuestion.alternatives.map((alt) => {
                const isSelected = effectiveSelected === alt.id;
                const isCorrectAlt = alt.id === currentQuestion.correctAlternative;

                let altClass =
                  "flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ";

                if (submitted) {
                  if (isCorrectAlt) {
                    altClass += "border-success bg-success/10 text-success";
                  } else if (isSelected && !isCorrectAlt) {
                    altClass += "border-error bg-error/10 text-error";
                  } else {
                    altClass += "border-base-300 opacity-50 cursor-default";
                  }
                } else {
                  altClass += isSelected
                    ? "border-primary bg-primary/10"
                    : "border-base-300 hover:border-primary/50 hover:bg-base-300";
                }

                return (
                  <div
                    key={alt.id}
                    className={altClass}
                    onClick={() => handleOptionClick(alt.id)}
                    role="button"
                    tabIndex={submitted ? -1 : 0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleOptionClick(alt.id);
                    }}
                  >
                    <span className="font-bold text-sm mt-0.5 min-w-[20px]">
                      {alt.id}.
                    </span>
                    <span className="text-sm leading-relaxed">{alt.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Feedback box */}
            {submitted && !isCorrect && (
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <div>
                  <p className="font-semibold">
                    Correct answer:{" "}
                    <span className="uppercase">{currentQuestion.correctAlternative}</span>
                  </p>
                  <p className="text-sm opacity-90 mt-1">{currentQuestion.explanation}</p>
                </div>
              </div>
            )}

            {submitted && isCorrect && (
              <div className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Correct!</span>
              </div>
            )}

            {/* Actions */}
            <div className="card-actions justify-end mt-auto pt-2">
              {!submitted ? (
                <button
                  className="btn btn-primary"
                  disabled={!selectedOption}
                  onClick={handleSubmit}
                >
                  Check
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleNext}>
                  {isLastQuestion ? "See Results →" : "Next →"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 text-center text-sm text-base-content/40">
          Question {currentIndex + 1} of {totalQuestions}
        </div>
      </div>
    </main>
  );
}
