'use client'

import Table from '@/components/organisms/User/Table'
import { DialogForm } from '@/components/organisms/User/Dialog'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/app/store/userStore'
import { useRouter } from 'next/navigation';


export default function Users() {
  const infoUser = useUserStore((state) => state.infoUser);
  const router = useRouter();
  useEffect(() => {
    if (infoUser?.role !== 'Admin') {
      router.push('/unauthorized');
    }
  }, [infoUser, router]);


  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 200);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <>
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex items-center justify-start">
          <h1 className="text-xl font-semibold">Liste des utilisateurs</h1>
        </div>
        <div className="container mx-auto flex items-center gap-4" style={{ marginBottom: '-3rem' }}>
          <Input
            placeholder="Rechercher par le nom "
            className="w-full max-w-6xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <DialogForm />
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl border border-white/10 mt-10">
        <Table searchQuery={debouncedSearch} />
      </div>
    </>
  )
}


