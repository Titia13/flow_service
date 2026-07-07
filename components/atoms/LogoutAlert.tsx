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
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { LogOut, Power, PowerOff } from "lucide-react"
import { useState } from "react";
import { useUserStore } from "@/app/store/userStore";


export function LogoutAlert() {
    const [open, setOpen] = useState(false)
    const { UserLogout } = useUserStore()

    const logOut = () => {
         UserLogout()
        setOpen(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button className="p-2 rounded-full transition-all duration-200 hover:bg-red-50 hover:text-red-600 text-gray-400">
                    <LogOut size={16} />
                </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{"Confirmer la déconnexion"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Êtes-vous absolument sûr de vouloir vous déconnecter ?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={logOut}
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                        Confirmer
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
