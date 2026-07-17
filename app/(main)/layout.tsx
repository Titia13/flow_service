import Navbar from "@/components/molecules/Navbar";
import Image from "next/image";
import pana from "@/public/pana.svg";
import successful from "@/public/successful.svg";



export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main
        className="relative min-h-screen p-10 pt-24 antialiased overflow-hidden"
        style={{ backgroundColor: "#fffaf7" }}
      >
        <Image
          src={successful}
          alt="sucess"
          width={100}
          height={100}
          className="absolute top-165 left-70 object-contain opacity-[0.05] rotate-[-7deg] pointer-events-none select-none"
        />
         <Image
          src={successful}
          alt="sucess1"
          width={70}
          height={70}
          className="absolute top-70 right-1/2 -translate-x-1/2 object-contain opacity-[0.04] rotate-[3deg] pointer-events-none select-none"
        />
        
        <Image
          src={successful}
          alt="sucess2"
          width={70}
          height={70}
          className="absolute top-70 right-12 -translate-x-1/2 object-contain opacity-[0.04] rotate-[3deg] pointer-events-none select-none"
        />
        <Image
          src={pana}
          alt="panalayout"
          width={270}
          height={270}
          className="absolute bottom-5 right-5 object-contain opacity-[0.13] rotate-[3deg] pointer-events-none select-none"
        />
        {children}
      </main>
    </div>
  );
}
