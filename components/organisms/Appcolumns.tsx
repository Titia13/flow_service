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

export const columns: ColumnDef<Application>[] = [

  
  {
    accessorKey: "name",
    header: "Libelle",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
   {
    accessorKey: "is_active",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Date de creation",
  },
  {
    accessorKey: "updated_at",
    header: "Date de modification",
  },

  // Colonne des actions 
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      // console.log("rowww===", row)
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
            <DropdownMenuItem onClick={() =>setUserToEdit(item)}>
              <Pencil className="w-4 h-4 text-zinc-400" />
              Modifier
            </DropdownMenuItem>
            
            <DropdownMenuItem>Activer</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash2Icon className="w-4 h-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

  // const saveApp = useAppStore((state) => state.saveApp);
  //   const appToEdit = useAppStore((state) => state.appToEdit);
]