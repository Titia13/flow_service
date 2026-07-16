"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  Eye,
  Loader2,
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
import { FileTemplate, PayloadPdf, PdfTemplate, Template } from "@/app/features/types/template"
import { StatusAlert } from "./StatusAlert"
import Link from "next/link"
import { useTemplateStore } from "@/app/store/templateStore"
import { Loader } from "@/components/atoms/Loader"
import { extractAppCode, extractAppId } from "@/lib/utils"


export const getColumns = (
  setTemplateToEdit: (temp: Template) => void,
  confirmDelete: (id: Template['_id']) => Promise<void>,
  confirmStatus: (id: Template['_id']) => Promise<void>,
  uploadFile: (data: PdfTemplate, id: string) => Promise<void>,
  dynamicFileUpload: (data: PayloadPdf, id: string) => Promise<void>,
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
        const { loadingId } = useTemplateStore();
        const rowId = loadingId === data._id;
        const payload = {
          application_id: extractAppId(data.application_id) || "",
          filename: data.filename,
          app_code: extractAppCode(data.application_id) || "",
          meta_data: {
            visite: {
              reference: "VIS-2026-001",
              statut: "Terminé",
              dateDebut: "2026-07-13T09:00:00Z",
              dateFin: "2026-07-13T17:00:00Z",
              entite: {
                libelle: "Usine A",
                typeNiveau: "Site Industriel"
              },
              typeVisite: {
                libelle: "Sécurité"
              },
              equipe: [
                {
                  matricule: "M123",
                  prenom: "Jean",
                  nom: "Dupont",
                  habilitation: "Niveau 1",
                  isResponsable: true
                }
              ],
              reglesSecurites: [
                {
                  code: "S1",
                  libelle: "Port du casque obligatoire"
                }
              ]
            },
            responsableEquipe: {
              prenom: "Marie",
              nom: "Martin"
            },
            responsableVHS: {
              firstname: "Pierre",
              lastname: "Durand"
            },
            kpi: {
              totalObservations: 5
            },
            generatedAt: "2026-07-13T10:00:00Z",
            sectionsAvecObservations: [
              {
                libelle: "Zone de stockage",
                observations: [
                  {
                    refLexique: {
                      code: "OBS-001"
                    },
                    constat: "Cheminement obstrué",
                    localisation: "Allée 4",
                    recommandations: [
                      {
                        description: "Dégager l'allée immédiatement"
                      }
                    ],
                    preuves: []
                  }
                ]
              }
            ]
          }
        }
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
              {/* {inactiveTemp && (
                <DropdownMenuItem
                  className="text-zinc-600 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    uploadFile(dataUpload, data._id!);
                  }}
                >
                  {isRowLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      En cours...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 text-zinc-600" />
                      Aperçu 1
                    </>
                  )}
                </DropdownMenuItem>
              )} */}
              {/* testt avec dynamicFileUpload */}
              {inactiveTemp && (
                <DropdownMenuItem
                  className="text-zinc-600 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    dynamicFileUpload(payload, data._id!);
                  }}
                >
                  {rowId ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      En cours...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 text-zinc-600" />
                      Aperçu
                    </>
                  )}
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