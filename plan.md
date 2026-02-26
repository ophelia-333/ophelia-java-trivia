# Ophelia's Java Trivia — Implementation Plan

## Overview
A quiz web app to help Gabriel's girlfriend study Java and OOP.
All content (UI text, questions, answers) in **Brazilian Portuguese**.

## Non-functional Requirements
- **Mobile-first** responsive design
- **Dark mode** support (daisyUI theme toggle)
- All UI content in **Brazilian Portuguese**

## Stack / Tech
- **Next.js** (App Router)
- **Tailwind CSS**
- **daisyUI**

## Features

### Homepage
- Student selects a **topic** to study
- Topics available (based on what she studied today):
  - Classes (OOP)
  - Palavra-chave `return`
  - Palavra-chave `void`
  - Conceitos iniciais de OOP

### Quiz Flow
- Selecting a topic starts the quiz
- Each question occupies the **full page**
- **Stepper/breadcrumb** at the top: shows question numbers; clicking a number navigates directly to that question
- Student can only advance by **submitting** an answer (no skipping forward)

### Question Layout
- Question description displayed prominently
- **4 alternatives: A, B, C, D**
- Student selects one and submits

### Feedback (instant, on submit)
- ✅ **Correct:** nothing happens, auto-advance to next question
- ❌ **Wrong:** red box appears showing:
  - The correct answer
  - A brief explanation of why it's correct

### Results Page
- Shown after the last question
- Displays final score
- **If score ≥ 50% (above average):**
  - Anime image of Ophelia overjoyed, celebrating victory
- **If score < 50%:**
  - Anime image of Ophelia disappointed
  - Message: "Tente novamente!" (or similar)

## Data / Persistence Layer

**Current:** mock JSON files (no database yet)
**Future-ready:** scaffold a service layer so adding a real DB later requires minimal refactor

### Folder structure
```
src/data/          ← mock JSON files (acts as persistence layer for now)
src/services/      ← service functions that read from data/ (swap for DB calls later)
```

### Models

#### Subject
```ts
{
  id: string
  title: string        // e.g. "Classes em Java"
  description: string
}
```

#### Question
```ts
{
  id: string
  subjectId: string
  description: string
  alternatives: {
    id: "A" | "B" | "C" | "D"
    text: string
  }[]
  correctAlternative: "A" | "B" | "C" | "D"
  explanation: string   // shown when answer is wrong
  matter?: {            // optional rich content (image, code snippet, etc.)
    type: "image" | "code" | "text"
    content: string     // URL for image, raw string for code/text
    language?: string   // for code snippets (e.g. "java")
  }
}
```

---

*Plan complete — ready to scaffold.*
