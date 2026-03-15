import { create } from "zustand";
import { type AgreementPersonState } from "./types";
import { addAgreementPerson, deleteAgreementPerson, fetchAgreementPerson, updateAgreementPerson } from "../api";
import { extractErrorMessage } from "@/lib";

export const useAgreementPersonStore = create<AgreementPersonState>((set, get) => ({
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

            const { data, meta } = await fetchAgreementPerson({ page, limit, search })

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
            await addAgreementPerson(data)
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
            await deleteAgreementPerson(id)
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
            await updateAgreementPerson(id, data)
            get().fetch()
        } catch (error: any) {
            throw new Error(extractErrorMessage(error))
        }
    }
}))