import { create } from "zustand";
import type { CalendarState } from "./types";
import { fecthCalendar, updateCalendar } from "../api";

export const useCalendarStore = create<CalendarState>((set) => ({
    page: 1,
    limit: 10,
    totalItems: 0,
    items: [],
    isLoading: false,

    // Filtros
    async fetch() {
        try {
            set({ isLoading: true })

            const data = await fecthCalendar()

            set({ items: data })
        } catch (error: any) {
            throw new Error(error)
        } finally {
            set({ isLoading: false })
        }
    },

    async update(id, data) {
        try {
            const newData = await updateCalendar(id, data)

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
            throw new Error(error)
        }
    }
}))