
'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "@tanstack/react-form" 
import { Textarea } from "@/components/ui/textarea"
import { useAppStore } from "@/app/store/appStore"

export function AppDialogForm() {
  const saveApp = useAppStore((state) => state.saveApp);
  const appToEdit = useAppStore((state) => state.appToEdit);
  const isOpen = useAppStore((state) => state.isOpen);
  const setIsOpen = useAppStore((state) => state.setIsOpen);

  // const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: { name: "", description: "", code: "" },
    onSubmit: async ({ value}) => {
      await saveApp(value)
      setIsOpen(false) 
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Ajouter</Button>
      </DialogTrigger>

      <DialogContent  className="border-none shadow-none">
        <DialogHeader>
          <DialogTitle>
            {appToEdit ? "Modifier une application " : "Ajouter une application"}
            </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="flex flex-col gap-4"
        >
          <form.Field
            name="name"
            children={(field:any) => (
              <input
                className="w-full border border-input rounded-md px-3 py-2"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Libelle"
                required 
              />
            )}
          />
          <form.Field
            name="description"
            children={(field:any) => (
              <Textarea 
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Description" 
                required
                />
            )}
          /> 
          {/* si appToEdit, affiche ce form */}
          <form.Field
            name="description"
            children={(field:any) => (
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">Activer</SelectItem>
                      <SelectItem value="false">Desactiver</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
            )}
          />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="ghost">Annuler</Button>
            </DialogClose>
            <Button type="submit">
              {appToEdit ? "Modifier" : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}