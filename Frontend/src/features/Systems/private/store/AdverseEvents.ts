import { create } from "zustand";
import { type AdverseEventsState } from "./types";
import { deleteAdverseEvent, fetchAdverseEvents, updateAdverseEvent } from "../api";
import { extractErrorMessage } from "@/lib";

export const useAdverseEventsStore = create<AdverseEventsState>((set, get) => ({
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
            const { data, meta } = await fetchAdverseEvents()

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

    async remove(id) {
        try {
            await deleteAdverseEvent(id)
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
            await updateAdverseEvent(id, data)
            get().fetch()
        } catch (error: any) {
            throw new Error(extractErrorMessage(error))
        }
    }
}))