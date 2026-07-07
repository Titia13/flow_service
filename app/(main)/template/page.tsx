"use client";
import { DialogForm } from "@/components/organisms/Template/Dialog";
import Table from "@/components/organisms/Template/Table";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => { //pour la recherche
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 200);
    return () => clearTimeout(timeout);
  }, [searchQuery]);


  return (
    <>
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex items-center justify-start">
          <h1 className="text-xl font-semibold">Gestion des templates</h1>
        </div>
        <div className="container mx-auto flex items-center gap-4" style={{ marginBottom: '-3rem' }}>
          <Input
            placeholder="Rechercher ..."
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
