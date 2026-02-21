import { create } from "zustand";
import { type CIE10State } from "./types";
import { addCIE10, deleteCIE10, fecthCIE10, updateCIE10 } from "../api";

export const useCIE10Store = create<CIE10State>((set, get) => ({
    page: 1,
    limit: 10,
    totalItems: 0,
    items: [],
    isLoading: false,

    totalPages: 0,
    lastItem: 0,
    firstItem: 0,

    // Filtros
    search: "",
    setSearch: (search) => set({ search, page: 1 }),

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit, page: 1 }),

    async fetch() {
        try {
            set({ isLoading: true })
            const { page, limit, search } = get()

            const { data, meta } = await fecthCIE10({ page, limit, search })

            set({
                items: data,
                totalItems: meta.total,
                totalPages: meta.totalPages,
                firstItem: meta.firstItem,
                lastItem: meta.lastItem
            })
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

    async add(data) {
        try {
            await addCIE10(data)
            get().fetch()
            set({
                page: 1
            })
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Error desconocido"
            throw new Error(message)
        }
    },

    async remove(id) {
        try {
            await deleteCIE10(id)
            get().fetch()
            set({
                page: 1
            })
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Error desconocido"
            throw new Error(message)
        }
    },

    async update(id, data) {
        try {
            const newData = await updateCIE10(id, data)
            set((state) => ({
                items: state.items.map((system: any) =>
                    system.id === id
                        ? {
                            ...system,
                            ...newData
                        }
                        : system
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