import { create } from "zustand";
import type { JuristicState } from "./types";
import { addJuristic, deleteJuristic, fetchJuristics, updateJuristic } from "../api";
import { extractErrorMessage } from "@/lib";

export const useJuristicStore = create<JuristicState>((set, get) => ({
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

            const { data, meta } = await fetchJuristics({ page, limit, search })

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
            await addJuristic(data)
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
            await deleteJuristic(Number(id))
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
            const newData = await updateJuristic(Number(id), data)
            set((state) => ({
                items: state.items.map((system: any) =>
                    system.id === Number(id)
                        ? {
                            ...system,
                            ...newData
                        }
                        : system
                ),
            }))
        } catch (error: any) {
            throw new Error(extractErrorMessage(error))
        }
    }
}))