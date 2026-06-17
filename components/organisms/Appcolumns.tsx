"use client"

import { Application } from "@/app/features/types/app"
import { ColumnDef } from "@tanstack/react-table"
import {
  MoreHorizontal,
  Trash2Icon,
  Pencil,
  Power,
  PowerOff
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppStore } from "@/app/store/appStore"
import { AlertActionExample } from "../Alert"
// import { AlertDialogSmall } from "../Alert"

// export const columns: ColumnDef<Application>[] = [ 
export const getColumns = (
  setAppToEdit: (app: Application) => void,
  confirmStatus: (app: Application) => Promise<void>
): ColumnDef<Application>[] => [
    {
      accessorKey: "name",
      header: "Libelle",
      enablePinning: true,
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "is_active",
      header: "Statut",
      cell: ({ row }) => (row.original.is_active ? "Active" : "Inactive"),
    },
    {
      accessorKey: "created_at",
      header: "Date de creation",
      cell: ({ row }) => (row.original.created_at ? new Date(row.original.created_at).toLocaleDateString('fr-FR') : "Date inconnue"),
    },
    {
      accessorKey: "updated_at",
      header: "Date de modification",
      cell: ({ row }) => (row.original.updated_at ? new Date(row.original.updated_at).toLocaleDateString('fr-FR') : "Date inconnue"),
    },

    // Colonne des actions 
    {
      header: "Actions",
      id: "actions",
      accessorKey: "action",
      enablePinning: true,
      cell: ({ row }) => {
        const data = row.original
        // console.log("id===", data.id)
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setAppToEdit(data)}>
                <Pencil className="w-4 h-4 text-zinc-400" />
                Modifier
              </DropdownMenuItem>

              {/* <DropdownMenuItem>
                {data.is_active ? (
                  <>
                    <PowerOff className="w-4 h-4" /> Désactiver
                  </>
                ) : (
                  <>
                    <Power className="w-4 h-4" /> Activer
                  </>
                )}
                <AlertActionExample /> 

                {/* <Alert
                  title={data.is_active ? 'Voulez-vous désactiver l\'application' : 'Voulez-vous activer l\'application'}
                  itemName={`${data.name}`}
                  onConfirm={async () => {
                    setAppToChangeStatus(data);
                    await confirmStatus();
                  }}
                  customTrigger={
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()} // Empêche la fermeture du menu
                      className="focus:bg-white/10 focus:text-white cursor-pointer"
                    >
                      {data.is_active ? (
                        <>
                          <PowerOff className="w-4 h-4" /> Désactiver
                        </>
                      ) : (
                        <>
                          <Power className="w-4 h-4" /> Activer
                        </>
                      )}
                    </DropdownMenuItem>
                  }
                /> */}
              {/* </DropdownMenuItem> */}

              <DropdownMenuItem
                onClick={async () => {
                  await confirmStatus(data)
                  console.log("Changer le statut de l'application :", data._id);
                }}
                className="cursor-pointer"
              >
                {data.is_active ? (
                  <div className="flex items-center gap-2 w-full">
                    <PowerOff className="w-4 h-4" />
                    <span>Désactiver</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 w-full">
                    <Power className="w-4 h-4" />
                    <span>Activer</span>
                  </div>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2Icon className="w-4 h-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]