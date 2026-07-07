import React, { useState } from "react"
import { Trash2Icon } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
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

interface AlertDialogProps {
    name?: string;
    title?: string;
    onConfirm: () => Promise<void>;
}

export const DeleteAlert = ({ name, title, onConfirm }: AlertDialogProps) => {
    const [open, setOpen] = useState(false)

    const handleConfirm = async (e: React.MouseEvent) => {
        e.preventDefault()
        await onConfirm()
        setOpen(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive cursor-pointer">
                    <Trash2Icon className="w-4 h-4" />
                    <span>Supprimer</span>
                </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title || "Confirmer la suppression"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Êtes-vous absolument sûr de vouloir supprimer <strong>{name}</strong> ?
                        Cette action est irréversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                        Confirmer
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}