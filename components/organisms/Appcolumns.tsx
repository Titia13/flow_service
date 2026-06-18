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
import { StatusAlert } from "../Alert"
import { Badge } from "@/components/ui/badge"
// import { AlertActionExample } from "../Alert"
// import { AlertDialogSmall } from "../Alert"

// export const columns: ColumnDef<Application>[] = [ 
export const getColumns = (
  setAppToEdit: (app: Application) => void,
  confirmStatus: (app_id: Application['_id']) => Promise<void>
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
      // cell: ({ row }) => (row.original.is_active ? "Active" : "Inactive"),
      cell: ({ row }) => {
        const isActive = row.original.is_active;
      return (
      <Badge 
        className={
          isActive 
            ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" 
            : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
        }
      >
        {isActive ? "Active" : "Inactive"}
      </Badge>
      )
      }
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
      // accessorKey: "action",
      enablePinning: true,
      cell: ({ row }) => {
        const data = row.original
        console.log("data===", data)
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setAppToEdit(data)} className="text-zinc-600 cursor-pointer">
                <Pencil className="w-4 h-4 text-zinc-600" />
                Modifier
              </DropdownMenuItem>

              {/* <DropdownMenuItem> */}
                <StatusAlert
                app={data}
                title="Confirmer le changement de statut"
                onConfirm={() => confirmStatus(data._id)}
                 />
              {/* </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive cursor-pointer">
                <Trash2Icon className="w-4 h-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]