import { create } from 'zustand';

interface TestState {
    testText: string;
    setTestText: (name: string) => void;
}

export const useTestStore = create<TestState>((set) => ({
    testText: 'ㄴㄴ',
    setTestText: (testText) => set({ testText }),
}));
