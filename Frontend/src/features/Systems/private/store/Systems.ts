import { create } from "zustand";
import { type SystemsState } from "./types";
import { addSystem, countSystems, deleteSystem, fetchSystems, updateSystem } from "../api";

export const useSystemsStore = create<SystemsState>((set, get) => ({
    page: 1,
    limit: 10,
    totalItems: 0,
    systems: [],
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

            const data = await fetchSystems({ page, limit, search })
            const count = await countSystems({ search })

            set({ systems: data, totalItems: count })
        } catch (error: any) {
            throw new Error(error)
        } finally {
            set({ isLoading: false })
        }
    },

    async add(data) {
        try {
            await addSystem(data)
            get().fetch()
            set({
                page: 1
            })
        } catch (error: any) {
            throw new Error(error)
        }
    },

    async remove(id) {
        try {
            await deleteSystem(id)
            get().fetch()
            set({
                page: 1
            })
        } catch (error: any) {
            throw new Error(error)
        }
    },

    async update(id, data) {
        try {
            const newData = await updateSystem(id, data)
            set((state) => ({
                systems: state.systems.map((system: any) =>
                    system.id === id
                        ? {
                            ...system,
                            ...newData
                        }
                        : system
                )
            }))
        } catch (error: any) {
            throw new Error(error)
        }
    }
}))