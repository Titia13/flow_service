import { create } from "zustand"
import { Application } from "../features/types/app";
import Swal from "sweetalert2"
import { apiFetch } from "../features/api/api";

interface UserStore {
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

export const useAppStore = create<UserStore>((set, get) => ({
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
      const users = await apiFetch('/users');
      const totalUsers = users.length;
      console.log("USERS", users, totalUsers)

      const modifiedUsers = users.filter(
        (user: User) =>
          user.updatedAt &&
          user.createdAt &&
          new Date(user.updatedAt).getTime() !== new Date(user.createdAt).getTime()
      ).length;

      const activeUsers = users.filter((user :User) => user.isActive === true).length;
      const inactiveUsers = users.filter((user :User) => user.isActive === false).length;

      set({
        users,
        totalUsers,
        modifiedUsers,
        activeUsers,
        inactiveUsers,
        loading: false,
      });
      console.log("test", totalUsers,
        modifiedUsers,
        activeUsers,
        inactiveUsers,)


    } catch (error: unknown) {
      set({
        error: "Erreur lors du chargement des utilisateurs",
        loading: false,
      });
    }
  },
  setApps: (apps) => set({ apps, totalApps: apps.length }),
    setIsOpen: (isOpen) => set({ isOpen }),
  }));


//   saveUser: async (userData) => {
//     const { userToEdit, users } = get();
//     try {
//       if (userToEdit && userToEdit.id) {
//         const mergedData = { ...userToEdit, ...userData };
//         const { id, isActive, refreshToken, createdAt, ...cleanData } = mergedData;

//         const updated = await apiFetch(`/users/${id}`, {
//           method: "PATCH",
//           body: JSON.stringify(cleanData),
//         });

//         set({
//           users: users.map((u) => (u.id === id ? updated : u)),
//           isOpen: false,
//           userToEdit: null,
//         });
//       } else {
//         const { id, createdAt, ...newUserData } = userData;
//         const newUser = await apiFetch("/users", {
//           method: "POST",
//           body: JSON.stringify(newUserData),
//         });
        
//         set({
//           users: [newUser, ...users],
//           isOpen: false,
//           totalUsers: get().totalUsers + 1
//         });
//       }
    
//       Toast.fire({ icon: 'success', title: 'Utilisateur sauvegardé' });

//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Erreur lors de la sauvegarde';
//       set({ error: message });
      
//       Toast.fire({ icon: 'error', title: 'Utilisateur non sauvegardé' });
//     }
//   },

  // saveUser: (appData: Partial<Application>) => Promise<void>;
//   setUserToEdit: (user) => set({ userToEdit: user, isOpen: !!user }),
//   setUserToDelete: (user) => set({ userToDelete: user, isOpenDelete: !!user }),
//   setUserToChangeStatus: (user) => set({ userStatus: user, isOpenStatus: !!user }),



//   confirmDelete: async () => {
//     const { userToDelete, users } = get();
//     if (!userToDelete?.id) return;
//     try {
//       await apiFetch(`/users/${userToDelete.id}`, {
//         method: "DELETE",
//       });
//       set({ 
//         users: users.filter(u => u.id !== userToDelete.id),
//         isOpenDelete: false,
//         userToDelete: null 
//       });
//       Toast.fire({ icon: 'success', title: 'Utilisateur supprime' });

//     } catch (err) {
//       set({ error: 'Erreur lors de la suppression' });
//       Toast.fire({ icon: 'error', title: 'Erreur lors de la suppression' });
//     }
//   },

//   confirmStatus: async () => {
//     const { userStatus, users } = get();
//     if (!userStatus?.id) return;
  
//     try {
//       let updatedUser: User;
//       if (userStatus.isActive) {
//         updatedUser = await apiFetch(`/users/deactivate/${userStatus.id}`, {
//           method: "PATCH",
//         });
//       } else {
//         updatedUser = await apiFetch(`/users/activate/${userStatus.id}`, {
//           method: "PATCH",
//         });
//       }
  
//       set({
//         users: users.map(u =>
//           u.id === userStatus.id ? updatedUser : u
//         ),
//         isOpenStatus: false,
//         userStatus: null
//       });
//       Toast.fire({ icon: 'success', title: 'Statut mis a jour' });
  
//     } catch (err) {
//       set({ error: 'Erreur pendant le changement de statut' });
//       Toast.fire({ icon: 'error', title: 'Erreur pendant le changement de statut' });
//     }
//   }
