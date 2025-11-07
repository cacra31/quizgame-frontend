import { create } from 'zustand';

interface UserState {
  name: string;
  score: number;
  setName: (name: string) => void;
  addScore: (point: number) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  score: 0,
  setName: (name) => set({ name }),
  addScore: (point) => set((state) => ({ score: state.score + point })),
  reset: () => set({ name: '', score: 0 }),
}));
