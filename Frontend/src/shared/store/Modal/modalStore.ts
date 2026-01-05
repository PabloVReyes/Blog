import { create } from "zustand";
import type { ModalState } from "./type";

export const useModalStore = create<ModalState>((set) => ({
    opened: false,
    modal: null,
    openModal: (data) => set({ opened: true, modal: data }),
    closeModal: () => set({ opened: false, modal: null })
}));
