import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <>
    <main className="flex min-h-screen flex-col items-center">
      <section className="flex flex-col items-center justify-center gap-6 px-6 pt-32 pb-20 text-center">
        <h1 className="text-6xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
          Lisez et libérez<br />votre esprit.
        </h1>
        <p className="text-lg text-gray-400 max-w-md leading-relaxed">
          Bienvenue sur ce site Next.js moderne et simple.
          C&apos;est un mini site de gestion de livres pour apprendre Next.js.
        </p>
        <div className="flex gap-4 mt-4">
          <a href="/books" className="px-6 py-3 bg-white text-black font-semibold rounded-full text-sm hover:bg-gray-100 transition">
            S&apos;incrire
          </a>
          <a href="/about" className="px-6 py-3 border border-gray-600 text-white font-semibold rounded-full text-sm hover:border-gray-400 transition">
            Se connecter
          </a>
        </div>
      </section>

      <section className="flex flex-row items-center gap-16 px-16 py-20 max-w-6xl w-full">
        <div className="w-1/2 h-96 overflow-hidden rounded-3xl shadow-2xl flex-shrink-0">
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-white leading-snug">
            Organisez votre bibliothèque personnelle
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Ajoutez, consultez et gérez vos livres facilement.
            Une interface épurée pour les passionnés de lecture qui veulent garder
            une trace de leurs lectures.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-400 transition-colors"
          > Commencer →
          </Link>
        </div>
      </section>
    </main>
  </>
  );
}


