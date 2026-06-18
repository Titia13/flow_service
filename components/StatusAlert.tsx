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
import { DropdownMenuItem } from "./ui/dropdown-menu"
import { Power, PowerOff } from "lucide-react"
import { useState } from "react";


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

export function StatusAlert({ app, title, description, onConfirm }: AlertDialogProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = async () => {
    await onConfirm()
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
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
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
          >{"Confirmer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
