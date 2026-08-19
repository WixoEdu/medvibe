import type { Metadata } from "next";
import TemaApp from "./TemaApp";

// Sin generateStaticParams: el contenido de cada tema ya no se conoce (ni se
// prerenderiza) en tiempo de build — solo llega al navegador vía /api/content
// después de verificar la sesión, para que no quede embebido en el HTML/JS
// estático de visitantes sin cuenta.
export const metadata: Metadata = {
  title: "Tema | MedVibe",
};

export default async function TemaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <TemaApp slug={slug} />;
}
