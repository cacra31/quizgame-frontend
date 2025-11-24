import { create } from 'zustand';

export interface User {
    userId: string;
    name: string;
}

interface AuthState {
    user: User | null;
    isAuth: boolean;
    init: boolean;
    login: (user: User) => void;
    logout: () => void;
    setInit: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuth: false,
    init: false,
    login: (user) => set({ user, isAuth: true }),
    logout: () => set({ user: null, isAuth: false }),
    setInit: (value) => set({ init: value }),
}));

export default useAuthStore;