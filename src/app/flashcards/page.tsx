import { Suspense } from "react";
import type { Metadata } from "next";
import FlashcardsApp from "./FlashcardsApp";

export const metadata: Metadata = {
  title: "Flashcards | MedVibe",
};

export default function FlashcardsPage() {
  return (
    <Suspense fallback={null}>
      <FlashcardsApp />
    </Suspense>
  );
}
