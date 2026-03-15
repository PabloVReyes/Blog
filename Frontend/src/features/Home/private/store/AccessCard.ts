import { create } from "zustand";
import type { AccessCardState } from "./types";
import { addAccessCard, deleteAccessCard, fecthAccessCard, updateAccessCard } from "../api";
import { extractErrorMessage } from "@/lib";

export const useAccessCardStore = create<AccessCardState>((set, get) => ({
    page: 1,
    limit: 10,
    totalItems: 0,
    items: [],
    isLoading: false,

    // Paginacion
    totalPages: 1,

    // Filtros
    search: "",
    setSearch: (search) => set({ search, page: 1 }),

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit, page: 1 }),

    firstItem: 1,
    lastItem: 10,

    async fetch() {
        try {
            set({ isLoading: true })
            const { search, page, limit } = get()

            const { data, meta } = await fecthAccessCard({ page, limit, search })
            set({
                items: data,
                totalItems: meta.total,
                totalPages: meta.totalPages,
                firstItem: meta.firstItem,
                lastItem: meta.lastItem
            })
        } catch (error: any) {
            throw new Error(extractErrorMessage(error))
        } finally {
            set({ isLoading: false })
        }
    },

    async add(data) {
        try {
            await addAccessCard(data)
            get().fetch()
            set({
                page: 1
            })
        } catch (error: any) {
            throw new Error(extractErrorMessage(error))
        }
    },

    async remove(id) {
        try {
            await deleteAccessCard(id)
            get().fetch()
            set({
                page: 1
            })
        } catch (error: any) {
            throw new Error(extractErrorMessage(error))
        }
    },

    async update(id, data) {
        try {
            const newData = await updateAccessCard(id, data)

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
            throw new Error(extractErrorMessage(error))
        }
    }
}))