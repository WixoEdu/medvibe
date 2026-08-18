import { Suspense } from "react";
import type { Metadata } from "next";
import NemotecniasApp from "./NemotecniasApp";

export const metadata: Metadata = {
  title: "Nemotecnias | MedVibe",
};

export default function NemotecniasPage() {
  return (
    <Suspense fallback={null}>
      <NemotecniasApp />
    </Suspense>
  );
}
