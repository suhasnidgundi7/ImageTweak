import { create } from "zustand";

export const useManagedUI = create((set) => ({
  isModalOpen: false,
  setModalOpen: (isOpen) => set(() => ({ isModalOpen: isOpen })),
}));
