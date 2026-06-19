import { create } from "zustand"
import { Application } from "../features/types/app";
import Swal from "sweetalert2"
import { apiFetch } from "../features/api/api";

interface AppStore {
  apps: Application[];
  loading: boolean;
  error: string | null;
  isOpen: boolean;
  appToEdit: Application | null;
  totalApps: number;
  pageCount: number;
  itemsPerPage: number;
  currentPage: number;

  fetchApps: (page?: number, size?: number, searchQuery?: string) => Promise<void>;
  // setApps: (apps: Application[]) => void;
  setIsOpen: (open: boolean) => void;
  saveApp: (appData: Partial<Application>) => Promise<void>;
  setAppToEdit: (app: Application | null) => void;
  confirmStatus: (app_id: Application['_id']) => Promise<void>;
  confirmDelete: (app_id: Application['_id']) => Promise<void>; 
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

export const useAppStore = create<AppStore>((set, get) => ({
  apps: [],
  loading: false,
  error: null,
  isOpen: false,
  appToEdit: null,
  totalApps: 0,
  pageCount: 0,
  itemsPerPage: 5,
  currentPage: 1,
  searchQuery: "",

  fetchApps: async (currentPage, itemsPerPage, searchQuery) => {
    try {
      set({ loading: true, error: null });
       const params = new URLSearchParams({
      page: String(currentPage),
      size: String(itemsPerPage),
    });
      if (searchQuery) params.set("name", searchQuery);
      const response = await apiFetch(`/app?${params.toString()}`);
      const apps = response.items || []; 
      const totalApps = response.total;
      set({
        apps,
        totalApps,
        loading: false,
      });
    } catch (error) {
      const message = 'Erreur lors du chargement';
      set({ error: message });
      Toast.fire({ icon: 'error', title: message });
    }
  },

  // setApps: (apps) => set({ apps, totalApps: apps.length }),

  setIsOpen: (isOpen) => set({ isOpen }),

  saveApp: async (appData) => {
    const { appToEdit, apps } = get();
    try {
      if (appToEdit) {
        const id = appToEdit._id
        if (!id) {
          console.error("ID manquant");
          return;
        }
        const mergedData = { ...appToEdit, ...appData };
        const { id: _, _id: __, created_at, updated_at, ...cleanData } = mergedData;
        const response = await apiFetch(`/app/${id}`, {
          method: "PUT",
          body: JSON.stringify(cleanData),
        });
        if (response.exists) {
          Toast.fire({ icon: 'warning', title: response.message });
          return
        }

        const updatedData = response.application || response;
        set({
          apps: apps.map((u) => (u._id === id ? updatedData : u)),
          isOpen: false,
          appToEdit: null,
        });
        Toast.fire({ icon: 'success', title: response.message || 'Application modifiée avec succès' });
      } else {
        const response = await apiFetch("/app/insert", {
          method: "POST",
          body: JSON.stringify(appData),
        });
        if (response.exists) {
          Toast.fire({ icon: 'warning', title: response.message });
          return
        }
        const newApp = response.application
        set({
          apps: [newApp, ...apps],
          isOpen: false,
          totalApps: get().totalApps + 1
        });
        Toast.fire({ icon: 'success', title: response.message });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la sauvegarde';
      set({ error: message });
      Toast.fire({ icon: 'error', title: message });
    }
  },

  setAppToEdit: (app) => set({ appToEdit: app, isOpen: !!app }),

  // Activer/desactiver une application
  confirmStatus: async (app_id: Application['_id']) => {
    const { apps } = get();
    if (!app_id) return;
    try {
      const response = await apiFetch(`/app/${app_id}`, {
        method: "PATCH",
      });
      if (!response.exists) {
        Toast.fire({ icon: 'warning', title: response.message });
        return
      }
      set({
        apps: apps.map(u =>
          u._id === app_id ? response.application : u,
        ),
        appToEdit: null
      });
      Toast.fire({ icon: 'success', title: response.message });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur pendant le changement de statut';
      set({ error: message });
      Toast.fire({ icon: 'error', title: message });
    }
  },  
  confirmDelete: async (app_id: Application['_id']) => {
    const {apps} = get();
    if (!app_id) return;
    try {
      const response = await apiFetch(`/app/${app_id}`, {
        method: "DELETE",
      });
      console.log("response===", response)
      set({ 
        apps: apps.filter(a => a._id !== response.application._id),
        // appToDelete: null 
      });
      Toast.fire({ icon: 'success', title: response.message || 'Application supprimée avec succès' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur pendant le changement de statut';
      set({ error: message });
      Toast.fire({ icon: 'error', title: message });
    }
  },

}));

