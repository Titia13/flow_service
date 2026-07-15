import { create } from "zustand"
import { Template, FileTemplate, PdfTemplate } from "../features/types/template";
import Swal from "sweetalert2"
import { apiFetch, base_url } from "../features/api/api";
import { metadata } from "../layout";

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
  result: string | null;
  loadingId: string | null;

  fetchTemplates: (page?: number, size?: number, searchQuery?: string) => Promise<void>;
  listTemplates: () => Promise<void>;
  // setTemplates: (templates: Template[]) => void;
  setIsOpen: (open: boolean) => void;
  saveTemplate: (templateData: Partial<Template>) => Promise<void>;
  setTemplateToEdit: (template: Template | null) => void;
  confirmStatus: (app_id: Template['_id']) => Promise<void>;
  confirmDelete: (id: Template['_id']) => Promise<void>;
  dynamicUploadFile: (data: FileTemplate, id: string) => Promise<void>;
  uploadFile: (data: FileTemplate, id: string) => Promise<void>;
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
  activeTemplates: [],
  searchQuery: "",
  result: "",
  loadingId:null,
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
        activeTemplates: activeTemplates as FileTemplate[]
      });
    } catch (error) {
      const message = 'Erreur lors du chargement';
      set({ error: message, loading: false });
      Toast.fire({ icon: 'error', title: message });
    }
  },

  setIsOpen: (isOpen) => {
    if (!isOpen) {
      set({ templateToEdit: null }); // reset à la fermeture
    }
    set({ isOpen: isOpen });
  },

  saveTemplate: async (templateData) => {
    const { templateToEdit, templates } = get();
    try {
      if (templateToEdit) {
        const id = templateToEdit._id
        if (!id) {
          return;
        }
        const mergedData = { ...templateToEdit, ...templateData };

        const { id: _, _id: __, created_at, updated_at, is_active, is_deleted, version, engine, type, ...cleanData } = mergedData;
        const body = {
          filename: templateData.filename || templateToEdit.filename,
          content: templateData.content || templateToEdit.content,
          application_id: (() => {
            const appId = templateData.application_id || templateToEdit.application_id;
            return typeof appId === "object" && appId !== null ? (appId as any)._id : appId;
          })(),
        };
        const response = await apiFetch(`/templates/${id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
        if (!response.exists) {
          Toast.fire({ icon: 'warning', title: 'Une erreur est survenue' });
          return
        }
        const updatedData = response.template
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
        if (!response.exists) {
          Toast.fire({ icon: 'warning', title: response.message });
          return
        }
        const newTemp = response.template
        set({
          templates: [newTemp, ...templates],
          isOpen: false,
          totalTemplates: get().totalTemplates + 1,
          templateToEdit: null,
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

  dynamicUploadFile: async (data) => {
    try {
      set({ loading: true, error: null });
      const payload: PdfTemplate = {
        application_id: data.application_id._id, 
        filename: data.filename,
        metadata: data.filename
      };
      const response = await fetch(`${base_url}/templates/pdf/generate/${data.application_id}/${data.filename}`, {
        // http://localhost:8000/templates/pdf/generate/6a317843afcaf3ebc942d239/test%202%20horus
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Erreur HTTP: ${response.status}`);
      }
      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition");
      const match = disposition?.match(/filename="?(.+?)"?$/);
      const filename = match?.[1] ?? `Document_${Date.now()}.pdf`;
      const file = new File([blob], filename, { type: "application/pdf" });
      const url = window.URL.createObjectURL(file);
      window.open(url, "_blank");

      setTimeout(() => window.URL.revokeObjectURL(url), 10_000);

      set({ result: "Super", loading: false });
    } catch (error) {
      const message = "Une erreur est survenue ou le contenu du template est invalide";
      set({ error: message, loading: false });
      Toast.fire({ icon: "error", title: message });
    }
  },

  uploadFile: async (data, id) => {
  set({error: null, loadingId: id });
  try {
    const payload: PdfTemplate = {
      application_id: data.application_id._id, 
      filename: data.filename
    };
    
    const response = await fetch(`${base_url}/templates/pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Erreur HTTP: ${response.status}`);
    }

    const blob = await response.blob();
    const disposition = response.headers.get("Content-Disposition");
    const match = disposition?.match(/filename="?(.+?)"?$/);
    const filename = match?.[1] ?? `Document_${Date.now()}.pdf`;
    const file = new File([blob], filename, { type: "application/pdf" });
    const url = window.URL.createObjectURL(file);
    window.open(url, "_blank");

    setTimeout(() => window.URL.revokeObjectURL(url), 10_000);
    set({ result: "Super", loadingId: null });

  } catch (error) {
    const message = "Une erreur est survenue ou le contenu du template est invalide";
    set({ error: message, loadingId: null });
    Toast.fire({ icon: "error", title: message });
  } finally {
    // Le 'finally' s'exécute quoi qu'il arrive
    set({ loadingId: null });
  }
},

}));
















