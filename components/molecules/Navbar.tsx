'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { useEffect, useState } from 'react';
import {User2Icon } from 'lucide-react';
import { LogoutAlert } from '../atoms/LogoutAlert';

export default function Navbar() {
  const pathname = usePathname();
  const [userRole, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; firstname: string; role: string } | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    const userData = localStorage.getItem('user');
    setRole(savedRole);
    setUser(userData ? JSON.parse(userData) : null);
  }, []);

  const links = [
    { name: 'Dashboard', href: '/home' },
    { name: 'Applications', href: '/application' },
    { name: 'Templates', href: '/template' },
    { name: 'Fichiers', href: '/file' },
    { name: 'Utilisateurs', href: '/user' },
  ];

  const filteredLinks = links.filter((link) => {
    if (!userRole) return false;
    if (userRole === 'Admin') return true;
    if (userRole === 'Editeur') return (link.name !== 'Utilisateurs' && link.href !== '/user');
    return false;
  });

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow">
      <div className="font-bold text-2xl tracking-tighter cursor-pointer">Flow</div>

      <div className="flex items-center space-x-6">
        {filteredLinks.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "transition-colors duration-200 font-medium px-2 py-1 rounded-md",
                isActive
                  ? "text-orange-500"
                  : "text-gray-500 hover:text-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 outline-none"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm shadow-teal-900/20 ring-2 ring-white/20 flex-shrink-0"
            style={{ backgroundColor: '#f97316' }}
          >
            <span className="text-white font-bold text-sm"><User2Icon /></span>
          </div>
          <div className="hidden md:block text-left leading-tight">
            <p className="text-sm font-semibold truncate max-w-[110px] lg:max-w-[160px] text-gray-900">
              {user?.name} {user?.firstname}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wide truncate max-w-[110px] lg:max-w-[160px] text-gray-400">
              {user?.role}
            </p>
          </div>
        </div>
        <LogoutAlert />
      </div>

    </nav>
  );
}
