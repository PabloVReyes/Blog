import { create } from "zustand";
import type { AlertState } from "./types";
import { fecthAlert, updateAlert } from "../api";

export const useAlertStore = create<AlertState>((set) => ({
    page: 1,
    limit: 10,
    totalItems: 0,
    items: [],
    isLoading: false,

    async fetch() {
        try {
            set({ isLoading: true })

            const data = await fecthAlert()

            set({ items: data })
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Error desconocido"
            throw new Error(message)
        } finally {
            set({ isLoading: false })
        }
    },

    async update(id, data) {
        try {
            const newData = await updateAlert(id, data)

            set((state) => ({
                items: state.items.map((item: any) =>
                    item.id === id
                        ? {
                            ...item,
                            ...newData
                        }
                        : item
                )
            }))
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Error desconocido"
            throw new Error(message)
        }
    }
}))