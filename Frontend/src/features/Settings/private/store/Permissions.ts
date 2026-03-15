import { create } from "zustand";
import { addPermission, deletePermission, fecthPermissions, updatePermission } from "../api";
import type { PermissionsState } from "./types";
import { extractErrorMessage } from "@/lib";

export const usePermissionsStore = create<PermissionsState>((set, get) => ({
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

            const { data, meta } = await fecthPermissions({ page, limit, search })

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
            await addPermission(data)
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
            await deletePermission(String(id))
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
            const newData = await updatePermission(String(id), data)
            set((state) => ({
                items: state.items.map((system: any) =>
                    system.id === id
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