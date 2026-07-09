"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Upload,
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
import { DeleteAlert } from "@/components/atoms/DeleteAlert"
import { FileTemplate, PdfTemplate, Template } from "@/app/features/types/template"
import { StatusAlert } from "./StatusAlert"
import Link from "next/link"


export const getColumns = (
  setTemplateToEdit: (temp: Template) => void,
  confirmDelete: (id: Template['_id']) => Promise<void>,
  confirmStatus: (id: Template['_id']) => Promise<void>,
  uploadFile: (data: FileTemplate) => Promise<void>
): ColumnDef<Template>[] => [
    {
      accessorKey: "filename",
      header: "Libelle",
      enablePinning: true,
    },
    {
      accessorKey: "application_id.name",
      header: "Application",
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
    // Colonne des actions 
    {
      header: "Actions",
      id: "actions",
      // accessorKey: "action",
      enablePinning: true,
      cell: ({ row }) => {
        const data = row.original
        const inactiveTemp = row.original.is_active
        console.log("data====", data)
        const dataUpload = {
          filename: data.filename,
          application_id: data.application_id,
        } as PdfTemplate
        console.log("dataUpload====", dataUpload)

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
              <StatusAlert
                temp={data}
                title="Confirmer le changement de statut"
                onConfirm={() => confirmStatus(data._id)}
              />
              {inactiveTemp && (
                <DropdownMenuItem
                  className="text-zinc-600 cursor-pointer"
                  onClick={() => uploadFile(dataUpload)}
                >
                  <Eye className="w-4 h-4 text-zinc-600" />
                  <span>Aperçu</span>
                </DropdownMenuItem>
              )}
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