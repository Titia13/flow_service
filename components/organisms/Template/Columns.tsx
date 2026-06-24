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
import { Template } from "@/app/features/types/template"
import { HoverCardSides } from "@/components/atoms/HoverCard"
import { StatusAlert } from "./StatusAlert"

// export const columns: ColumnDef<Application>[] = [ 
export const getColumns = (
  setTemplateToEdit: (temp: Template) => void,
  confirmDelete: (id: Template['_id']) => Promise<void>,
  confirmStatus: (id: Template['_id']) => Promise<void>
): ColumnDef<Template>[] => [
    {
      accessorKey: "filename",
      header: "Nom du template",
      enablePinning: true,
    },
    {
      accessorKey: "application_id.name",
      header: "Application",
    },
    {
      accessorKey: "created_at",
      header: "Date de creation",
      // cell: ({ row }) => (row.original.created_at ? new Date(row.original.created_at).toLocaleDateString('fr-FR',
      //   {
      //   day: '2-digit',
      //   month: '2-digit',
      //   year: 'numeric',
      //   hour: '2-digit',
      //   minute: '2-digit'
      // }) : "Date inconnue"),
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

    // Colonne des actions 
    {
      header: "Actions",
      id: "actions",
      // accessorKey: "action",
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
              <DropdownMenuItem onClick={() => setTemplateToEdit(data)} className="text-zinc-600 cursor-pointer">
                <Pencil className="w-4 h-4 text-zinc-600" />
                Modifier
              </DropdownMenuItem>
              {/* <HoverCardSides /> */}
                <StatusAlert
                temp={data}
                title="Confirmer le changement de statut"
                onConfirm={() => confirmStatus(data._id)}
                 />
              <DropdownMenuSeparator />
              <DeleteAlert
                name={data.filename}
                title="Confirmer la suppression"
                onConfirm={() => confirmDelete(data._id)}
                 /> 
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]