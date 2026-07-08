import { create } from "zustand"
import Swal from "sweetalert2"
import { apiFetch } from "../features/api/api";
import { Role, Stats, User, UserInfo, UserLogin } from "../features/types/user";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
  background: '#ffffff',
  color: '#6b7280',
  didOpen: (toast) => {
    toast.style.border = '1px solid #ffffff';
  }
});

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  isOpen: boolean;
  userToEdit: User | null;
  totalUsers: number;
  pageCount: number;
  itemsPerPage: number;
  currentPage: number;
  searchQuery: string;
  activeUsers: User[],
  roles: Role,
  connectedUser: string | null,
  isAuthenticated: boolean,
  statsUser: Stats,
  statsApp: Stats,
  statsTemplate: Stats,
  infoUser: UserInfo,

  getRoles: () => Promise<void>;
  fetchUsers: (page?: number, size?: number, searchQuery?: string) => Promise<void>;
  listUsers: () => Promise<void>;
  setIsOpen: (open: boolean) => void;
  saveUser: (userData: Partial<User>) => Promise<void>;
  setUserToEdit: (user: User | null) => void;
  confirmStatus: (id: User['_id']) => Promise<void>;
  confirmDelete: (id: User['_id']) => Promise<void>;
  UserLogin: (data: UserLogin) => Promise<void>;
  UserLogout: () => void;
  stats: () => Promise<void>;
}


export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  isOpen: false,
  userToEdit: null,
  totalUsers: 0,
  pageCount: 0,
  itemsPerPage: 5,
  currentPage: 1,
  searchQuery: "",
  activeUsers: [],
  roles: {},
  connectedUser: "",
  infoUser: {
    name: "",
    firstname: "",
    email: "",
    role: ""
  },
  isAuthenticated: false,
  statsUser: {
    total: 0,
    active: 0,
    inactive: 0,
    modifiedUsers: 0
  },
  statsApp: {
    total: 0,
    active: 0,
    inactive: 0,
    modifiedUsers: 0
  },
  statsTemplate: {
    total: 0,
    active: 0,
    inactive: 0,
    modifiedUsers: 0
  },

  getRoles: async () => {
    try {
      const roles = await apiFetch("/users/roles");
      set({
        roles
      });
    } catch (error) {
      const message = 'Erreur lors de la sauvegarde';
      set({ error: message, loading: false });
      Toast.fire({ icon: 'error', title: message });
    }
  },
  fetchUsers: async (currentPage, itemsPerPage, searchQuery) => {
    try {
      set({ loading: true, error: null });
      const params = new URLSearchParams({
        page: String(currentPage),
        size: String(itemsPerPage),
      });
      if (searchQuery) {
        params.set("name", searchQuery);
        // params.set("firstname", searchQuery);
        // params.set("email", searchQuery);
        // params.set("role", searchQuery);
      }
      const response = await apiFetch(`/users?${params.toString()}`);
      const users = response.items || [];
      const totalUsers = response.total;
      const pageCount = response.pages;
      set({
        users,
        totalUsers,
        pageCount,
        loading: false
      });
    } catch (error) {
      const message = 'Erreur lors du chargement';
      set({ error: message, loading: false });
      Toast.fire({ icon: 'error', title: message });
    }
  },
  listUsers: async () => {
    try {
      const response = await apiFetch("/users");
      const users = response.items || [];
      const activeUsers = users.filter((i: { is_active: boolean; }) => i.is_active === true);
      set({
        activeUsers
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur lors de la sauvegarde';
      set({ error: message, loading: false });
      Toast.fire({ icon: 'error', title: message });
    }
  },
  setIsOpen: (isOpen) => {
    if (!isOpen) {
      set({ userToEdit: null }); // reset à la fermeture
    }
    set({ isOpen: isOpen });
  },
  saveUser: async (userData) => {
    const { userToEdit, users } = get();
    try {
      if (userToEdit) {
        const id = userToEdit._id
        if (!id) {
          return;
        }
        const mergedData = { ...userToEdit, ...userData };
        const { id: _, _id: __, created_at, updated_at, is_active, is_deleted, deleted_at, ...cleanData } = mergedData;
        const response = await apiFetch(`/users/${id}`, {
          method: "PUT",
          body: JSON.stringify(cleanData),
        });

        if (!response.exists) {
          Toast.fire({ icon: 'warning', title: response.message });
          return
        }
        const updatedData = response.user
        set({
          users: users.map((u) => (u._id === id ? updatedData : u)),
          isOpen: false,
          userToEdit: null,
        });
        Toast.fire({ icon: 'success', title: response.message });
      } else {
        const response = await apiFetch("/users/register", {
          method: "POST",
          body: JSON.stringify(userData),
        });
        if (response.exists) {
          Toast.fire({ icon: 'warning', title: response.message });
          return
        }

        const newUser = response.user
        set({
          users: [newUser, ...users],
          isOpen: false,
          totalUsers: get().totalUsers + 1,
          userToEdit: null,
        });
        Toast.fire({ icon: 'success', title: response.message });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la sauvegarde';
      set({ error: message, loading: false });
      Toast.fire({ icon: 'error', title: message });
    }
  },
  setUserToEdit: (user) => set({ userToEdit: user, isOpen: !!user }),
  confirmStatus: async (id: User['_id']) => {
    const { users } = get();
    if (!id) return;
    try {
      const response = await apiFetch(`/users/${id}`, {
        method: "PATCH",
      });
      if (!response.exists) {
        Toast.fire({ icon: 'warning', title: response.message });
        return
      }
      const dataRes = response.user
      set({
        users: users.map(t =>
          t._id === id ? dataRes : t,
        ),
        userToEdit: null
      });
      Toast.fire({ icon: 'success', title: response.message });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur pendant le changement de statut';
      set({ error: message });
      Toast.fire({ icon: 'error', title: message });
    }
  },

  confirmDelete: async (id: User['_id']) => {
    const { users } = get();
    if (!id) return;
    try {
      const response = await apiFetch(`/users/${id}`, {
        method: "DELETE",
      });
      set({
        users: users.filter(a => a._id !== response.user._id),
      });
      Toast.fire({ icon: 'success', title: response.message });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur pendant la suppresion';
      set({ error: message });
      Toast.fire({ icon: 'error', title: message });
    }
  },

  UserLogin: async (data: UserLogin) => {
    try {
      const response = await apiFetch("/users/login", {
        method: "POST",
        body: JSON.stringify(data)
      });
      if (!response.exists) {
        Toast.fire({ icon: 'warning', title: response.message });
        return
      }
      const infoUser = response.user
      set({
        isAuthenticated: true,
        loading: false,
        connectedUser: response.message,
        infoUser
      });
      Toast.fire({ icon: 'success', title: response.message });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Mot de passe ou email incorrect';
      set({
        error: message, isAuthenticated: false,
        loading: false,
      });
      Toast.fire({ icon: 'error', title: message });
    }
  },

  UserLogout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.location.href = '/login';
  },

  stats: async () => {
    try {
      const responseUser = await apiFetch("/users/stats", {
        method: "GET",
      });
      const responseApp = await apiFetch("/app/stats", {
        method: "GET",
      });
      const responseTemplate = await apiFetch("/templates/stats", {
        method: "GET",
      });
      if (!responseUser.exists) {
        Toast.fire({ icon: 'warning', title: responseUser.message });
        return
      }
      const statsUser = responseUser.stats
      const statsApp = responseApp.stats
      const statsTemplate = responseTemplate.stats
      set({
        isAuthenticated: true,
        loading: false,
        statsApp,
        statsUser,
        statsTemplate
      });
      // Toast.fire({ icon: 'success', title: responseUser.message });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Mot de passe ou email incorrect';
      set({
        error: message, isAuthenticated: false,
        loading: false,
      });
      Toast.fire({ icon: 'error', title: message });
    }
  },

}));
