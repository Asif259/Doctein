import { create } from "zustand";

interface AuthState {
    isLoggedIn: boolean;
    role: "doctor" | "patient" | "staff" | null;
    isProfileCompleted: boolean;
    login: () => void;
    logout: () => void;
    setRole: (role: AuthState["role"]) => void;
    setIsProfile: (isProfileCompleted: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    role: null,
    isProfileCompleted: false,
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
    setRole: (role: AuthState["role"]) => set({ role }),
    setIsProfile: (isProfileCompleted: boolean) => set({ isProfileCompleted }),
}));

export { useAuthStore };
