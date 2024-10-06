import { create } from "zustand";
import { appointment, patient, staff } from "@/types/dashboard";

interface AuthState {
  isLoggedIn: boolean;
  user: string;
  token: string;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: "",
  token: "",
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export { useAuthStore };
