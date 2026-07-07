import { ChartPieLabel } from "@/components/molecules/ChartPie";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <>
      <section className="flex flex-col items-center justify-center gap-6 px-6 pt-32 pb-20 text-center">
        <h1 className="text-6xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
                    <span>Découvrez</span> <span>FLOW</span> votre Outil de Téléchargement de fichiers

        </h1>
        <p className="text-lg text-gray-400 max-w-md leading-relaxed">
          C&apos;est un mini site de gestion de livres pour apprendre Next.js.
        </p>
        <div className="flex gap-4 mt-4">
        </div>
      </section>

      <section className="flex flex-row items-center gap-16 px-16 py-20 max-w-6xl w-full">

        <div className="flex flex-col gap-4">
          <div>
          <ChartPieLabel />

          </div>
          <Link
            href="/application"
            className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-400 transition-colors"
          > C&apos;est parti !! →
          </Link>
        </div>
      </section>
  </>
  );
}



