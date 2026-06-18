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
    appToDelete: Application | null;
    appStatus: Application | null;
    totalApps: number;
    modifiedApps:number;
    activeApps:number;
    inactiveApps:number;
    isOpenDelete: boolean;
    isOpenStatus: boolean;

    fetchApps: () => Promise<void>; 
    setApps: (apps: Application[]) => void;
    setIsOpen: (open: boolean) => void;
    saveApp: (appData: Partial<Application>) => Promise<void>;
    setAppToEdit: (app: Application | null) => void;
    confirmStatus: (app_id: Application['_id']) => Promise<void>;
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
  appToDelete: null,
  appStatus:null,
  totalApps: 0,
  modifiedApps:0,
  activeApps: 0,
  inactiveApps:0,
  isOpenDelete: false,
  isOpenStatus:false,

  fetchApps: async () => {
    try {
      set({ loading: true, error: null });
      const apps = await apiFetch('/app');
      const totalApps = apps.length;
      console.log("applications===", apps, totalApps)

      const modifiedApps = apps.filter(
        (app :Application) =>
          app.updated_at &&
          app.created_at &&
          new Date(app.updated_at).getTime() !== new Date(app.created_at).getTime()
      ).length;

      const activeApps = apps.filter((app :Application) => app.is_active === true).length;
      const inactiveApps = apps.filter((app :Application) => app.is_active === false).length;
      set({
        apps,
        totalApps,
        activeApps,
        modifiedApps,
        inactiveApps,
        loading: false,
      });
    } catch (error: unknown) {
      set({
        error: "Erreur lors du chargement",
        loading: false,
      });
    }
  },
  setApps: (apps) => set({ apps, totalApps: apps.length }),
  setIsOpen: (isOpen) => set({ isOpen }),
  saveApp: async (appData) => {
    const { appToEdit, apps } = get();
    try {
      if (appToEdit) {
        console.log("appToEdit===", appToEdit)
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
        console.log("response put======", response)

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
        console.log("response==========", response)
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
      console.log("erreur==========", err)
      const message = err instanceof Error ? err.message : 'Erreur lors de la sauvegarde';
      set({ error: message });
      Toast.fire({ icon: 'error', title: message });
    }
  },
  setAppToEdit: (app) => set({ appToEdit: app, isOpen: !!app }),

  // Activer/desactiver une application
  confirmStatus: async (app_id: Application['_id']) => {
  console.log("ON ENTRE")
  console.log("app===============", app_id)


  const { apps  } = get();

  // console.log("appStatus===", appStatus, apps)

  //   const id = app._id;
    if (!app_id) return;
    try {
        const response = await apiFetch(`/app/${app_id}`, {
          method: "PATCH",
        });
        console.log("response status change===", response)


      if (response.exists) { 
        Toast.fire({ icon: 'warning', title: response.message });
        return
      }
      set({
        apps: apps.map(u =>
          u._id === app_id ? response : u,
        console.log("apps interieur===", apps)

        ),
        isOpenStatus: false,
        appToEdit: null
      });
        console.log("apps===", apps)

      Toast.fire({ icon: 'success', title: response.message });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur pendant le changement de statut';
      set({ error: message });
      Toast.fire({ icon: 'error', title: message });
    }
  },

  
  }));

