import type { Metadata } from "next";
import ContrarrelojGame from "./ContrarrelojGame";

export const metadata: Metadata = {
  title: "Contrarreloj | MedVibe",
};

export default function ContrarrelojPage() {
  return <ContrarrelojGame />;
}
