import { Suspense } from "react";
import type { Metadata } from "next";
import TablasApp from "./TablasApp";

export const metadata: Metadata = {
  title: "Tablas | MedVibe",
};

export default function TablasPage() {
  return (
    <Suspense fallback={null}>
      <TablasApp />
    </Suspense>
  );
}
