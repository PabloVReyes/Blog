import type { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalData {
    title?: string;
    subtitle?: string;
    content: ReactNode;
}

interface ModalState {
    opened: boolean
    modal: ModalData | null
    openModal: (data: ModalData) => void;
    closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
    opened: false,
    modal: null,
    openModal: (data) => set({ opened: true, modal: data }),
    closeModal: () => set({ opened: false, modal: null })
}));
