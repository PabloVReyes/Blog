import type { ReactNode } from "react";

interface ModalData {
    title?: string;
    subtitle?: string;
    content: ReactNode;
    autoClose?: number;
}

export interface ModalState {
    opened: boolean
    modal: ModalData | null
    openModal: (data: ModalData) => void;
    closeModal: () => void;
};
