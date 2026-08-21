import type { Metadata } from "next";
import ComentariosApp from "./ComentariosApp";

export const metadata: Metadata = {
  title: "Comentarios y reportes | MedVibe",
};

export default function ComentariosPage() {
  return <ComentariosApp />;
}
