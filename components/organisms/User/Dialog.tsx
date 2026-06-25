
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
import { useAppStore } from "@/app/store/appStore";
import { Plus } from "lucide-react";
import { useUserStore } from "@/app/store/userStore";


//     const selectedApp = activeApps.find(app => app._id === value.application_id);

// if (selectedApp) {
//   await save({
//     ...value,
//     application_id: selectedApp // Pass the object instead of the string
//   });
//   setIsOpen(false);
// }
export function DialogForm() {
  const save = useUserStore((state) => state.saveUser);
  const userToEdit = useUserStore((state) => state.userToEdit);
  const isOpen = useUserStore((state) => state.isOpen);
  const setIsOpen = useUserStore((state) => state.setIsOpen);
  const getRoles = useUserStore((state) => state.getRoles);


  const form = useForm({
    defaultValues: { name: "", firstname: "", email: "", pwd: "", role: "" },
    onSubmit: async ({ value }) => {
      await save(value)
      setIsOpen(false)

    }
  })
 useEffect(() => {
    getRoles();
  }, []);
  useEffect(() => {
    if (isOpen) {
      if (userToEdit) {
        form.reset({
          name: userToEdit.name || "",
          firstname: userToEdit.firstname || "",
          email: userToEdit.email || "Horos",
          role: userToEdit.role || "",
          pwd: userToEdit.pwd || "",
        });
      } else {
        // listApps()
        form.reset({ name: "", firstname: "", email: "", pwd: "", role: "" });
      }
    }
  }, [userToEdit, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Ajouter
        </Button>
      </DialogTrigger>

      <DialogContent className="border-none shadow-none">
        <DialogHeader className="mb-4">
          <DialogTitle>
            {userToEdit ? "Modifier un utilisateur " : "Ajouter un utilisateur"}
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
            children={(field: any) => (
              <input
                className="w-full border border-input rounded-md px-3 py-2"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Nom"
                type="text"
                maxLength={30}
                required
              />
            )}
          />
          <form.Field
            name="firstname"
            children={(field: any) => (
              <input
                className="w-full border border-input rounded-md px-3 py-2"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Prenom"
                type="text"
                maxLength={30}
                required
              />
            )}
          />
          <form.Field
            name="email"
            children={(field: any) => (
              <input
                className="w-full border border-input rounded-md px-3 py-2"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Email"
                type="text"
                maxLength={30}
                required
              />
            )}
          />
          <form.Field
            name="pwd"
            children={(field: any) => (
              <input
                className="w-full border border-input rounded-md px-3 py-2"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Mot de passe"
                type="text"
                maxLength={30}
                required
              />
            )}
          />
          <form.Field
            name="role"
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
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editeur</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>)
            }}
          />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="ghost">Annuler</Button>
            </DialogClose>
            <Button type="submit">
              {userToEdit ? "Modifier" : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}