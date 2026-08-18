import type { Metadata } from "next";
import MemoriaGame from "./MemoriaGame";

export const metadata: Metadata = {
  title: "Memoria | MedVibe",
};

export default function MemoriaPage() {
  return <MemoriaGame />;
}
