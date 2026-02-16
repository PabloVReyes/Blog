import { create } from "zustand";
import type { DerechohabienciaState } from "./types";
import { fecthDerechohabiencia } from "../api";
import { updateDerechohabiencia } from "../api";

export const useDerechohabienciaStore = create<DerechohabienciaState>((set) => ({
    page: 1,
    limit: 10,
    totalItems: 0,
    items: [],
    isLoading: false,

    async fetch() {
        try {
            set({ isLoading: true })

            const data = await fecthDerechohabiencia()

            set({ items: data })
        } catch (error: any) {
            throw new Error(error)
        } finally {
            set({ isLoading: false })
        }
    },

    async update(id, data) {
        try {
            const newData = await updateDerechohabiencia(id, data)

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
            throw new Error(error)
        }
    }
}))