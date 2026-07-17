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
  temp?: {
    _id?: string | number;
    filename?: string;
    is_active?: boolean;
    is_deleted?: boolean ;
  }
  title?: string;
  description?: string;
  onConfirm: () => void;
  // onCancel?: () => void;
}
// a revoir
export function MetaData({temp, title, description, onConfirm }: AlertDialogProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = async () => {
    await onConfirm()
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer text-zinc-600">
          {temp?.is_active ? (
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
            Êtes-vous sûr de vouloir {temp?.is_active ? "désactiver" : "activer"}{" "}
            le template <strong>{temp?.filename}</strong> ?
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
