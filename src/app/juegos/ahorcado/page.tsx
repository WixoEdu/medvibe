import type { Metadata } from "next";
import AhorcadoGame from "./AhorcadoGame";

export const metadata: Metadata = {
  title: "Ahorcado médico | MedVibe",
};

export default function AhorcadoPage() {
  return <AhorcadoGame />;
}
