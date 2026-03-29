import { create } from "zustand";
import type { ReactNode } from "react";

interface ModalData {
    title: string;
    subtitle?: string;
    icon: string;
    content: ReactNode;
    autoClose?: number;
    color?: string;

    withCloseButton?: boolean;
    closeOnEscape?: boolean;
    closeOnClickOutside?: boolean;
}

export interface ModalState {
    opened: boolean
    modal: ModalData | null
    openModal: (data: ModalData) => void
    closeModal: () => void
}

export const useModalStore = create<ModalState>((set, get) => ({
    opened: false,
    modal: null,

    openModal: (data) =>
        set({
            opened: true,
            modal: data
        }),

    closeModal: () => {

        const modal = get().modal

        // si el modal no permite cerrar, ignoramos
        if (modal?.closeOnEscape === false ||
            modal?.closeOnClickOutside === false ||
            modal?.withCloseButton === false) {
            return
        }

        set({
            opened: false,
            modal: null
        })
    }
}))