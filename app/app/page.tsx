import { ButtonShadcn } from '@/components/Button'
// import styles from './app.module.css'
import AppTable from '@/components/organisms/AppTable'
import { DataTable } from '@/components/organisms/data-table'
import { AppDialogForm } from '@/components/organisms/Dialog'

export default function Applications() {
    return (
        <main className="min-h-screen p-10 pt-24 antialiased" style={{ backgroundColor: '#fffaf7'}}>
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                  <h1 className="text-xl font-semibold">Liste des applications</h1>
              </div>
              
              <div className="flex items-center gap-4">
                {/* <ButtonShadcn />  */}
                <AppDialogForm />
              </div>
            </div>
          </div>
            <div className="mx-auto w-full max-w-6xl border border-white/10 mt-10">
                <AppTable />   
            </div>

        </main>
    )
}


