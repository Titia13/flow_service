
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
import { useTemplateStore } from "@/app/store/templateStore"
import { useAppStore } from "@/app/store/appStore";
import { Plus } from "lucide-react";


 //     const selectedApp = activeApps.find(app => app._id === value.application_id);

      // if (selectedApp) {
      //   await save({
      //     ...value,
      //     application_id: selectedApp // Pass the object instead of the string
      //   });
      //   setIsOpen(false);
      // }
export function DialogForm() {
  const save = useTemplateStore((state) => state.saveTemplate);
  const templateToEdit = useTemplateStore((state) => state.templateToEdit);
  const isOpen = useTemplateStore((state) => state.isOpen);
  const setIsOpen = useTemplateStore((state) => state.setIsOpen);
  const listApps = useAppStore((state) => state.listApps);
  const activeApps = useAppStore((state) => state.activeApps);

  const form = useForm({
    defaultValues: { filename: "", content: "", application_id: "" },
    onSubmit: async ({ value }) => {
      await save(value)
      setIsOpen(false)
     
    }
  })

  useEffect(() => {
    listApps();
  }, []);
console.log("activeApps :", activeApps);
  useEffect(() => {
    if (isOpen) {
      if (templateToEdit) {
        form.reset({
          filename: templateToEdit.filename || "",
          content: templateToEdit.content || "",
          application_id: templateToEdit.application_id || "",
          
        });
        console.log("templateToEdit.application_id :", templateToEdit.application_id)
console.log("activeApps _ids :", activeApps.map(a => a._id))

      } else {
        // listApps()
        form.reset({ filename: "", content: "", application_id: "" });
      }
    }
  }, [templateToEdit, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Ajouter
        </Button>
      </DialogTrigger>

      <DialogContent className="border-none shadow-none">
        <DialogHeader>
          <DialogTitle>
            {templateToEdit ? "Modifier un template " : "Ajouter un template"}
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
            name="application_id"
            children={(field) => {
              console.log("Valeur actuelle du champ :", field.state.value);
              return (
              <Select
                value={field.state.value ?? ""}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez une application" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {activeApps.map((app) => (
                      <SelectItem key={app._id} value={app._id}>
                        {app.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>)
            }}
          />

          <form.Field
            name="filename"
            children={(field: any) => (
              <input
                className="w-full border border-input rounded-md px-3 py-2"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Nom du template"
                type="text"
                maxLength={40}
                required
              />
            )}
          />
          <form.Field
            name="content"
            children={(field: any) => (
              <Textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Contenu"
                required
              />
            )}
          />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="ghost">Annuler</Button>
            </DialogClose>
            <Button type="submit">
              {templateToEdit ? "Modifier" : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}