import { create } from "zustand"
import { Template } from "../features/types/template";
import Swal from "sweetalert2"
import { apiFetch } from "../features/api/api";
import { Console } from "console";

interface TemplateStore {
  templates: Template[];
  loading: boolean;
  error: string | null;
  isOpen: boolean;
  templateToEdit: Template | null;
  totalTemplates: number;
  pageCount: number;
  itemsPerPage: number;
  currentPage: number;
  searchQuery: string;

  fetchTemplates: (page?: number, size?: number, searchQuery?: string) => Promise<void>;
  // setTemplates: (templates: Template[]) => void;
  setIsOpen: (open: boolean) => void;
  saveTemplate: (templateData: Partial<Template>) => Promise<void>;
  setTemplateToEdit: (template: Template | null) => void;
  confirmDelete: (id: Template['_id']) => Promise<void>; 
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
  background: '#18181b',
  color: '#ffffff',
  didOpen: (toast) => {
    toast.style.border = '1px solid #27272a';
  }
});

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: [],
  loading: false,
  error: null,
  isOpen: false,
  templateToEdit: null,
  totalTemplates: 0,
  pageCount: 0,
  itemsPerPage: 5,
  currentPage: 1,
  searchQuery: "",

  fetchTemplates: async (currentPage, itemsPerPage, searchQuery) => {
    try {
      set({ loading: true, error: null });
        const params = new URLSearchParams({
        page: String(currentPage),
        size: String(itemsPerPage),
      });
      if (searchQuery) params.set("filename", searchQuery);
      const response = await apiFetch(`/templates?${params.toString()}`);
      const templates = response.items ; 
      const totalTemplates = response.total;
      console.log("response templates", response)
      set({
        templates,
        totalTemplates,
        loading: false,
      });
    } catch (error) {
      const message = 'Erreur lors du chargement';
      set({ error: message, loading: false });
      Toast.fire({ icon: 'error', title: message });
    }
  },
  setIsOpen: (isOpen) => set({ isOpen }),

  saveTemplate: async (templateData) => {
    const { templateToEdit, templates } = get();
    try {
      if (templateToEdit) {
        console.log('templateToEdit=====', templateToEdit)
        const id = templateToEdit._id
        if (!id) {
          console.error("ID manquant");
          return;
        }
        const mergedData = { ...templateToEdit, ...templateData };
        console.log("mergedData", mergedData)
        const { id: _, _id: __, created_at, updated_at, ...cleanData } = mergedData;
        const response = await apiFetch(`/templates/${id}`, {
          method: "PUT",
          body: JSON.stringify(cleanData),
        });
        console.log("response====", response)

        if (response.exists) {
          Toast.fire({ icon: 'warning', title: response.message });
          return
        }

        const updatedData = response.application || response;
                console.log("updatedData====", updatedData)

        set({
          templates: templates.map((u) => (u._id === id ? updatedData : u)),
          isOpen: false,
          templateToEdit: null,
        });
        Toast.fire({ icon: 'success', title: response.message || 'Template modifié avec succès' });
      } else { 
        const response = await apiFetch("/templates", {
          method: "POST",
          body: JSON.stringify(templateData),
        });
        console.log("response add ==============", response)

        if (!response.exists) {
          Toast.fire({ icon: 'warning', title: response.message });
          return
        }
        const newTemp = response.template
        console.log("newTemp add ==============", newTemp)

        set({
          templates: [newTemp, ...templates],
          isOpen: false,
          totalTemplates: get().totalTemplates + 1
        });
        Toast.fire({ icon: 'success', title: response.message });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la sauvegarde';
      set({ error: message, loading: false });
      Toast.fire({ icon: 'error', title: message });
    }
  },

  setTemplateToEdit: (template) => set({ templateToEdit: template, isOpen: !!template }),

  confirmDelete: async (id: Template['_id']) => {
    const {templates} = get();
    if (!id) return;
    try {
      const response = await apiFetch(`/templates/${id}`, {
        method: "DELETE",
      });
      console.log("response===", response)
      set({ 
        templates: templates.filter(a => a._id !== response.application._id),
      });
      Toast.fire({ icon: 'success', title: response.message || 'Template supprimé avec succès' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur pendant le changement de statut';
      set({ error: message });
      Toast.fire({ icon: 'error', title: message });
    }
  },

}));
















// Activer/desactiver une application
  // confirmStatus: async (app_id: Application['_id']) => {
  //   const { apps } = get();
  //   if (!app_id) return;
  //   try {
  //     const response = await apiFetch(`/app/${app_id}`, {
  //       method: "PATCH",
  //     });
  //     if (!response.exists) {
  //       Toast.fire({ icon: 'warning', title: response.message });
  //       return
  //     }
  //     set({
  //       apps: apps.map(u =>
  //         u._id === app_id ? response.application : u,
  //       ),
  //       appToEdit: null
  //     });
  //     Toast.fire({ icon: 'success', title: response.message });
  //   } catch (err) {
  //     const message = err instanceof Error ? err.message : 'Erreur pendant le changement de statut';
  //     set({ error: message });
  //     Toast.fire({ icon: 'error', title: message });
  //   }
  // },