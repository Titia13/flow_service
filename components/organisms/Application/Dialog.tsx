
'use client'
import { useEffect } from "react";
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
import { useForm } from "@tanstack/react-form" 
import { Textarea } from "@/components/ui/textarea"
import { useAppStore } from "@/app/store/appStore"
import { Plus } from "lucide-react";

export function AppDialogForm() {
  const saveApp = useAppStore((state) => state.saveApp);
  const appToEdit = useAppStore((state) => state.appToEdit);
  const isOpen = useAppStore((state) => state.isOpen);
  const setIsOpen = useAppStore((state) => state.setIsOpen);
  const isUpdating = useAppStore((state) => state.isUpdating);


  // const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: { name: "", description: "", is_active: true, code: ""  },
    onSubmit: async ({ value}) => {
      await saveApp(value)
      setIsOpen(false) 
    }
  })

  useEffect(() => {
    if (isOpen) {
      if (appToEdit) {
        // Si on modifie, on injecte les valeurs de l'application sélectionnée
        form.reset({
          code: appToEdit.code || "",
          name: appToEdit.name || "",
          description: appToEdit.description || "",
          is_active: appToEdit.is_active ?? true,
        });
      } else {
        // Si on ajoute, on remet le formulaire à zéro
        form.reset();
      }
    }
  }, [appToEdit, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
           <Plus />Ajouter
        </Button>
      </DialogTrigger>

      <DialogContent className="border-none shadow-none">
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
          {appToEdit ? <form.Field
            name="code"
            children={(field:any) => (
              <input
                className="w-full border border-input rounded-md px-3 py-2"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Code"
                type="text"
                maxLength={30}
                required 
                disabled
              />
            )}
          /> : <form.Field
            name="code"
            children={(field:any) => (
              <input
                className="w-full border border-input rounded-md px-3 py-2 bg-gray-500"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Code"
                type="text"
                title="Impossible de modifier"
                maxLength={30}
                required 
              />
            )}
          />}
          
          <form.Field
            name="name"
            children={(field:any) => (
              <input
                className="w-full border border-input rounded-md px-3 py-2"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Libelle"
                type="text"
                maxLength={30}
                required 
              />
            )}
          />
          <form.Field
            name="description"
            children={(field:any) => (
              <Textarea 
              className="w-full break-all max-h-20 overflow-y-auto resize-none"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Description"
                maxLength={500} 
                required
                />
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