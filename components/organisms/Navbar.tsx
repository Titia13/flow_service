'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from "@/lib/utils"; // Utilitaire standard de Shadcn

export default function Navbar() {

  const pathname = usePathname();
  const links = [
    {name: 'Dashboard', href: '/'},
    {name: 'Applications', href: '/app'},
    {name: 'Templates', href: '/template'},
    {name: 'Fichiers', href: '/file'},
    {name: 'Utilisateurs', href: '/user'},
  ];
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow">
      <div className="font-bold text-2xl tracking-tighter cursor-pointer">Flow</div>
      
      <div className="flex items-center space-x-6">
        {links.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={cn(
                "transition-colors duration-200 font-medium px-2 py-1 rounded-md",
                isActive 
                  ? "text-orange-500" 
                  : "text-gray-500 hover:text-orange-400 focus-visible:ring-2 focus-visible:ring-orange-400 outline-none" 
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}