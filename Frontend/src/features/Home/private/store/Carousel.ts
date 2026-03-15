import { create } from "zustand";
import type { CarouselState } from "./types";
import { addCarousel, deleteCarousel, fecthCarousel, updateCarousel } from "../api";
import { extractErrorMessage } from "@/lib";

export const useCarouselStore = create<CarouselState>((set, get) => ({
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
            const { page, limit, search } = get()

            const { data, meta } = await fecthCarousel({ page, limit, search })
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
            await addCarousel(data)
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
            await deleteCarousel(id)
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
            const newData = await updateCarousel(id, data)

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