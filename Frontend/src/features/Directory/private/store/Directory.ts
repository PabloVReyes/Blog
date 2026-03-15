import { create } from "zustand";
import { type DirectoryState } from "./types";
import { addDirectory, fetchDirectory, updateDirectory, deleteDirectory } from "../api";
import { extractErrorMessage } from "@/lib";

export const useDirectoryStore = create<DirectoryState>((set, get) => ({
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

            const { data, meta } = await fetchDirectory({ page, limit, search })

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
            await addDirectory(data)
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
            await deleteDirectory(id)
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
            const newData = await updateDirectory(id, data)
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
            throw new Error(extractErrorMessage(error))
        }
    }
}))