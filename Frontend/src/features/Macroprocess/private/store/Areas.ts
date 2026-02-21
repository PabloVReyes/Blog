import { create } from "zustand";
import { countAreas, fetchAreas, updateArea } from "../api";
import type { AreasState } from "./types";

export const useAreasStore = create<AreasState>((set, get) => ({
    page: 1,
    limit: 10,
    totalItems: 0,
    areas: [],
    isLoading: false,

    // Filtros
    search: "",
    setSearch: (search) => set({ search, page: 1 }),

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit, page: 1 }),
    setTotalItems: (totalItems) => set({ totalItems }),

    totalPages: () => Math.ceil(get().totalItems / get().limit),
    firstItem: () =>
        get().totalItems === 0
            ? 0
            : (get().page - 1) * get().limit + 1,
    lastItem: () => Math.min(get().page * get().limit, get().totalItems),

    async fetch() {
        try {
            set({ isLoading: true })
            const { page, limit, search } = get()

            const data = await fetchAreas({ page, limit, search })
            const count = await countAreas({ search })

            set({ areas: data, totalItems: count })
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
            const newData = await updateArea(id, data)

            set((state) => ({
                areas: state.areas.map((manual: any) =>
                    manual.id === id
                        ? {
                            ...manual,
                            ...newData
                        }
                        : manual
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