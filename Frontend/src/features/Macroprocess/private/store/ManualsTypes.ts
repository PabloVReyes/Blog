import { create } from "zustand";
import { countManualsTypes, fetchManualsTypes, updateManualType } from "../api";
import type { ManualsTypesState } from "./types";

export const useManualsTypesStore = create<ManualsTypesState>((set, get) => ({
    page: 1,
    limit: 10,
    totalItems: 0,
    manuals: [],
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

            const data = await fetchManualsTypes({ page, limit, search })
            const count = await countManualsTypes({ search })

            set({ manuals: data, totalItems: count })
        } catch (error: any) {
            throw new Error(error)
        } finally {
            set({ isLoading: false })
        }
    },

    async update(id, data) {
        try {
            const newData = await updateManualType(id, data)

            set((state) => ({
                manuals: state.manuals.map((manual: any) =>
                    manual.id === id
                        ? {
                            ...manual,
                            ...newData
                        }
                        : manual
                )
            }))
        } catch (error: any) {
            throw new Error(error)
        }
    }
}))