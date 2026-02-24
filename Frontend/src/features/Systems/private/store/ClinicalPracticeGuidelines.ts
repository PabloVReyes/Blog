import { create } from "zustand";
import { type ClinicalPracticeGuidelinesState } from "./types";
import { addGuide, deleteGuide, fetchGuides, updateGuide } from "../api";

export const useClinicalPracticeGuidelinesStore = create<ClinicalPracticeGuidelinesState>((set, get) => ({
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

            const { data, meta } = await fetchGuides({ page, limit, search })

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
            await addGuide(data)
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
            await deleteGuide(id)
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
            const newData = await updateGuide(id, data)
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