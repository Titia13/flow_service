import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { DropdownMenuItem } from "./ui/dropdown-menu"
import { Power, PowerOff } from "lucide-react"


// je dois creer une interface pour rendre le composant reuitilisable. je vais ajouter des props pour le titre, la description et les actions du dialog
interface AlertDialogProps {
  app?: {
    _id?: string | number; 
    name?: string
    is_active?: boolean
  }
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function StatusAlert({ app, title, description, onConfirm, onCancel }: AlertDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm1 = async () => {
      try {
        setIsLoading(true)
        await onConfirm()
        console.log("Statut modifié avec succès pour :", app?._id)
      } catch (error) {
        console.error("Erreur lors de la modification du statut :", error)
      } finally {
        setIsLoading(false)
      }
    }

    const handleConfirm = async () => {
        setIsLoading(true)
        await onConfirm()
        console.log("Statut modifié avec succès pour :", app?._id)
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button variant="outline">Show Dialog</Button> */}
      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer text-zinc-600">
          {app?.is_active ? (
            <div className="flex items-center gap-2 w-full text-zinc-600">
              <PowerOff className="w-4 h-4" />
              <span>Désactiver</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full text-zinc-600">
              <Power className="w-4 h-4" />
              <span>Activer</span>
            </div>
          )}
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir {app?.is_active ? "désactiver" : "activer"}{" "}
            l'application <strong>{app?.name}</strong> ?
            </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel >Annuler</AlertDialogCancel>
          <AlertDialogAction
          onClick={handleConfirm}
            disabled={isLoading}
            // className={
            //   app?.is_active
            //     ? "bg-amber-600 hover:bg-amber-700 text-white"
            //     : "bg-emerald-600 hover:bg-emerald-700 text-white"
            // }
          >{isLoading ? "Chargement..." : "Confirmer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
