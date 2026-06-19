import { Input } from "@/components/ui/input";

export default function Templates() {
    return (
        <main className="min-h-screen p-10 pt-24 antialiased" style={{ backgroundColor: '#fffaf7' }}>
           <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex items-center justify-start">
          <h1 className="text-xl font-semibold">Gestion des templates</h1>
        </div>
        <div className="flex justify-between">
          <div>
            <Input
              placeholder="Rechercher par libelle "
              className="w-full max-w-6xl"
            //   value={searchQuery}
            //   onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            {/* <AppDialogForm /> */}
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl border border-white/10 mt-10">
        {/* <AppTable searchQuery={debouncedSearch} /> */}
      </div>

        </main>
    )
}
