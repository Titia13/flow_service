'use client'
import { useUserStore } from "@/app/store/userStore";
import { ChartPieLabel } from "@/components/molecules/ChartPie";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import pana from "@/public/pana.svg";

// export default function Home() {
//   const { statsUser, statsApp, statsTemplate, stats } = useUserStore();
//   useEffect(() => {
//     stats();
//   }, []);
//   return (
//     <>
//       {/* le background est de cette couleur */}
//       <section className="flex flex-col items-center justify-center gap-6 px-6 pt-32 pb-20 text-center">
//         <h1 className="text-6xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
//           <span className="text-6xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">Découvrez</span> <span>FLOW</span> votre Outil de Téléchargement de fichiers

//         </h1>
//         <p className="text-lg text-gray-400 max-w-md leading-relaxed">
//           mets ici un texte d&apos;accroche pour le site flow, qui explique ce que c&apos;est et pourquoi il est utile.
//         </p>
//         <div className="flex gap-4 mt-4">
//           <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
//             <h2 className="text-3xl font-bold text-white">{statsUser.total}</h2>
//             <p className="text-gray-400">Users</p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
//             <h2 className="text-3xl font-bold text-white">{statsApp.total}</h2>
//             <p className="text-gray-400">Applications</p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
//             <h2 className="text-3xl font-bold text-white">{statsTemplate.total}</h2>
//             <p className="text-gray-400">Templates</p>
//           </div>
//         </div>
//       </section>

//       <section className="flex flex-row items-center gap-16 px-16 py-20 max-w-6xl w-full">

//         <div className="flex flex-col gap-4">
//           {/* <div>
//           <ChartPieLabel />

//           </div> */}
//           <Link
//             href="/application"
//             className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-400 transition-colors"
//           > C&apos;est parti !! →
//           </Link>
//         </div>
//       </section>
//     </>
//   );
// }

export default function Home() {
  const { statsUser, statsApp, statsTemplate, stats } = useUserStore();
  
  useEffect(() => {
    stats();
  }, []);

  const data = [
    { label: "Applications", value: statsApp?.total || 0 },
    { label: "Templates", value: statsTemplate?.total || 0 },
    { label: "Utilisateurs", value: statsUser?.total || 0 },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center">
      <Image
          src={pana}
          alt="panahome"
          width={320}
          height={320}
          className="absolute top-58 left-2 object-contain opacity-[0.25] rotate-[-3deg] pointer-events-none select-none"
        />

      <section className="flex flex-col items-center justify-center gap-8 px-6 pt-12 pb-20 text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter">
          Simplifiez vos téléchargements de fichiers avec <span className="text-orange-500">FLOW</span>
        </h1>
        
        <p className="text-xl text-slate-500 max-w-xl leading-relaxed font-light">
          Centralisez vos ressources, accélérez vos téléchargements et gérez vos templates en un seul endroit. L'outil conçu pour votre productivité.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
          {data.map((stat, i) => (
            <div 
              key={i} 
              className="bg-white border border-slate-100 shadow-sm p-8 rounded-2xl hover:shadow-md transition-all duration-300"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-1 tracking-tight">{stat.value}</h2>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 py-10">
        <Link
          href="/application"
          className="group inline-flex items-center gap-3 text-slate-700 text-lg font-medium bg-slate-100 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-md transition-all duration-300"
        >
          C&apos;est parti !!!
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </section>
    </main>
  );
}