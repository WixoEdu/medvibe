import type { Metadata } from "next";
import PlanApp from "./PlanApp";

export const metadata: Metadata = {
  title: "Plan de estudio de 15 días | MedVibe",
};

export default function PlanPage() {
  return <PlanApp />;
}
