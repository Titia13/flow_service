'use client'

import AppTable from '@/components/organisms/Application/Table'
import { AppDialogForm } from '@/components/organisms/Application/Dialog'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'

export default function Applications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => { //pour la recherche
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 200);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <main className="min-h-screen p-10 pt-24 antialiased" style={{ backgroundColor: '#fffaf7' }}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex items-center justify-start">
          <h1 className="text-xl font-semibold">Liste des applications</h1>
        </div>
        {/* <div className="flex justify-between">
          <div>
            <Input
              placeholder="Rechercher par libelle "
              className="w-full max-w-6xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <AppDialogForm />
          </div>
        </div> */}
        <div className="container mx-auto flex items-center gap-4" style={{ marginBottom: '-3rem' }}>
          <Input
            placeholder="Rechercher par libelle "
            className="w-full max-w-6xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AppDialogForm />
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl border border-white/10 mt-10">
        <AppTable searchQuery={debouncedSearch} />
      </div>
      {/* ou celui ci  */}
      {/* <div className="mx-auto w-full max-w-6xl mt-20">
        <div className="flex items-center gap-4 mb-4">
          <Input
            placeholder="Rechercher par libelle "
            className="w-full max-w-6xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AppDialogForm />
        </div>
        <div className="p-4 card mb-10 rounded-md shadow-sm" style={{ backgroundColor: '#ffffff' }}>
          <AppTable searchQuery={debouncedSearch} />
        </div>
      </div> */}
    </main>
  )
}


