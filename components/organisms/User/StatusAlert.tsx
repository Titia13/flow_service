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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Power, PowerOff } from "lucide-react"
import { useState } from "react";


// je dois creer une interface pour rendre le composant reuitilisable.
interface AlertDialogProps {
  user?: {
    _id?: string | number;
    name?: string;
    firstname?: string;
    is_active?: boolean;
    is_deleted?: boolean ;
  }
  title?: string;
  description?: string;
  onConfirm: () => void;
  // onCancel?: () => void;
}

export function StatusAlert({user, title, description, onConfirm }: AlertDialogProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = async () => {
    await onConfirm()
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer text-zinc-600">
          {user?.is_active ? (
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
            Êtes-vous sûr de vouloir {user?.is_active ? "désactiver" : "activer"}{" "}
            <strong>{user?.name}</strong> <strong>{user?.firstname}</strong>?
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
