import { create } from "zustand";

export interface PaginationState {
    page: number;
    limit: number;
    totalItems: number;
    search: string;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setTotalItems: (total: number) => void;
    setSearch: (search: string) => void;
    totalPages: () => number;
    firstItem: () => number;
    lastItem: () => number;
}

export const usePageStore = create<PaginationState>((set, get) => ({
    page: 1,
    limit: 10,
    totalItems: 0,
    search: "",

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit, page: 1 }),
    setTotalItems: (totalItems) => set({ totalItems }),
    setSearch: (search: any) => set({ search, page: 1 }),

    totalPages: () => Math.ceil(get().totalItems / get().limit),
    firstItem: () => (get().page - 1) * get().limit + 1,
    lastItem: () => Math.min(get().page * get().limit, get().totalItems)
}))