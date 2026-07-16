import Image from "next/image";
import Link from "next/link";
import unauthorized from "@/public/unauthorized.svg";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#fffaf7' }}>
      <div className="flex flex-col items-center text-center space-y-6 max-w-md w-full">
        <Image
          src={unauthorized}
          alt="unauthorized"
          width={180}
          height={180}
          style={{ height: "auto" }}
          priority
        />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Page réservée aux administrateurs
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Vous n'avez pas les droits nécessaires pour accéder à cette page.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
          href="/home"
          className="group inline-flex items-center gap-3 text-slate-700 text-md font-medium bg-slate-200 hover:bg-slate-800 hover:text-white px-6 py-2 rounded-xl transition-all duration-300"
        ><span className="group-hover:-translate-x-1 transition-transform">←</span>
          Retour au tableau de bord
        </Link>
        </div>

      </div>
    </div>
  );
}