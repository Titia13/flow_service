"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  MoreHorizontal,
  Pencil,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { DeleteAlert } from "@/components/DeleteAlert"
import { StatusAlert } from "./StatusAlert"
import { User } from "@/app/features/types/user"

export const getColumns = (
  setUserToEdit: (user: User) => void,
  confirmDelete: (id: User['_id']) => Promise<void>,
  confirmStatus: (id: User['_id']) => Promise<void>
): ColumnDef<User>[] => [
    {
      accessorKey: "name",
      header: "Nom",
      enablePinning: true,
    },
     {
      accessorKey: "firstname",
      header: "Prenom",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "created_at",
      header: "Date de creation",
      cell: ({ row }) => {
        const dateValue = row.original.created_at;
        if (!dateValue) return "Date inconnue";
        const newDate = new Date(dateValue)
        const formatedDate = newDate.toLocaleDateString('fr-FR');
        const formatedHour = newDate.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        });;
        return `${formatedDate}, ${formatedHour}`
      }
    },
    {
      accessorKey: "updated_at",
      header: "Date de modification",
      cell: ({ row }) => {
        const dateValue = row.original.updated_at;
        if (!dateValue) return "Date inconnue";
        const newDate = new Date(dateValue)
        const formatedDate = newDate.toLocaleDateString('fr-FR');
        const formatedHour = newDate.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        });;
        return `${formatedDate}, ${formatedHour}`
      }
    },
      {
      accessorKey: "is_active",
      header: "Statut",
      cell: ({ row }) => {
        const isActive = row.original.is_active;
        return (
          <Badge
            className={
              isActive
                ? "bg-green-40 text-green-700"
                : "bg-red-50 text-red-700"
            }
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        )
      }
    },
    {
      header: "Actions",
      id: "actions",
      enablePinning: true,
      cell: ({ row }) => {
        const data = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setUserToEdit(data)} className="text-zinc-600 cursor-pointer">
                <Pencil className="w-4 h-4 text-zinc-600" />
                Modifier
              </DropdownMenuItem>
                <StatusAlert
                user={data}
                title="Confirmer le changement de statut"
                onConfirm={() => confirmStatus(data._id)}
                 />
              <DropdownMenuSeparator />
              <DeleteAlert
                name={data.name}
                title="Confirmer la suppression"
                onConfirm={() => confirmDelete(data._id)}
                 /> 
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]