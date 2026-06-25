import { create } from "zustand"
import { Template, FileTemplate } from "../features/types/template";
import Swal from "sweetalert2"
import { apiFetch } from "../features/api/api";

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
  activeTemplates: FileTemplate[],

  fetchTemplates: (page?: number, size?: number, searchQuery?: string) => Promise<void>;
  listTemplates: () => Promise<void>;
  // setTemplates: (templates: Template[]) => void;
  setIsOpen: (open: boolean) => void;
  saveTemplate: (templateData: Partial<Template>) => Promise<void>;
  setTemplateToEdit: (template: Template | null) => void;
  confirmStatus: (app_id: Template['_id']) => Promise<void>;
  confirmDelete: (id: Template['_id']) => Promise<void>;
}


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
  activeTemplates:[],
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
      const templates = response.items || [];
      const totalTemplates = response.total;
      const pageCount = response.pages;
      const activeTemplates = templates.filter((i: { is_active: boolean; }) => i.is_active === true);
      console.log("response templates", response)
      
      set({
        templates,
        totalTemplates,
        pageCount,
        loading: false,
        activeTemplates
      });
    } catch (error) {
      const message = 'Erreur lors du chargement';
      set({ error: message, loading: false });
      Toast.fire({ icon: 'error', title: message });
    }
  },

   listTemplates: async () => {
    try {
      const response = await apiFetch("/templates");
      const templates = response.items || [];
      const activeTemplates = templates.filter((i: { is_active: boolean; }) => i.is_active === true);
      set({
        activeTemplates
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
        // console.log('templateToEdit=====', templateToEdit)
        const id = templateToEdit._id
        if (!id) {
          console.error("ID manquant");
          return;
        }
        //   const payloadFirst = { ...templateToEdit, ...templateData, application_id: { ...templateToEdit.application_id, _id: templateData.application_id } };
        //   const payload = { ...templateToEdit, ...templateData, application_id: { ...templateToEdit.application_id } };
        //   const { id: _, _id: __, created_at, updated_at, is_active, is_deleted, version, ...cleanData } = payload;
        //   const body = {
        //     ...cleanData,
        //     application_id: cleanData.application_id?._id || cleanData.application_id?.id 
        //   };
        const mergedData = { ...templateToEdit, ...templateData };

        const { id: _, _id: __, created_at, updated_at, is_active, is_deleted, version, engine, type, ...cleanData } = mergedData;
        console.log("cleanData ====", cleanData)
        const body = {
          ...cleanData,
          application_id: cleanData.application_id
        };
        // console.log("body ====", body)
        const response = await apiFetch(`/templates/${id}`, {
          method: "PUT",
          body: JSON.stringify(mergedData),
        });
        console.log("response====", response)

        if (!response.exists) {
          Toast.fire({ icon: 'warning', title: 'Une erreur est survenue' });
          return
        }
        const updatedData = response.template
        console.log("updatedData====", updatedData)
        set({
          templates: templates.map((u) => (u._id === id ? updatedData : u)),
          isOpen: false,
          templateToEdit: null,
        });
        Toast.fire({ icon: 'success', title: response.message || 'Template modifié avec succès' });
      }
      else {
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

  confirmStatus: async (id: Template['_id']) => {
    const { templates } = get();
    if (!id) return;
    try {
      const response = await apiFetch(`/templates/${id}`, {
        method: "PATCH",
      });
      if (!response.exists) {
        Toast.fire({ icon: 'warning', title: response.message });
        return
      }
      const dataRes = response.result
      console.log("dataRes===", dataRes)
      set({
        templates: templates.map(t =>
          t._id === id ? dataRes : t,
        ),
        templateToEdit: null
      });
      Toast.fire({ icon: 'success', title: response.message });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur pendant le changement de statut';
      set({ error: message });
      Toast.fire({ icon: 'error', title: message });
    }
  },

  confirmDelete: async (id: Template['_id']) => {
    const { templates } = get();
    if (!id) return;
    try {
      const response = await apiFetch(`/templates/${id}`, {
        method: "DELETE",
      });

      set({
        templates: templates.filter(a => a._id !== response.temp._id),
      });
      Toast.fire({ icon: 'success', title: response.message || 'Template supprimé avec succès' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur pendant la suppresion';
      set({ error: message });
      Toast.fire({ icon: 'error', title: message });
    }
  },


}));
















