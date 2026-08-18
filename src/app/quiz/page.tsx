import { Suspense } from "react";
import type { Metadata } from "next";
import QuizApp from "./QuizApp";

export const metadata: Metadata = {
  title: "Quiz | MedVibe",
};

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizApp />
    </Suspense>
  );
}
