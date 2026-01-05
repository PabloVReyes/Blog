import { create } from "zustand";
import { deleteFile, getFiles, getFilesCount } from "@/features/uploads/api/uploads";
import type { useFilesStoreProps } from "./type";

export const useFilesStore = create<useFilesStoreProps>((set, get) => ({
    page: 1,
    limit: 25,
    totalItems: 0,
    items: [],
    isFetching: false,
    search: "",

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit, page: 1 }),
    setTotalItems: (totalItems) => set({ totalItems }),
    setSearch: (search: any) => set({ search, page: 1 }),
    totalPages: () => Math.ceil(get().totalItems / get().limit),
    firstItem: () => {
        const { page, limit, totalItems } = get();
        if (totalItems === 0) return 0;
        return (page - 1) * limit + 1;
    },
    lastItem: () => Math.min(get().page * get().limit, get().totalItems),

    // Obtener archivos
    async fetchFiles() {
        const { page, limit, search } = get();

        try {
            const list = await getFiles(page, limit, search)
            const count = await getFilesCount(search)

            set({ items: list, totalItems: count })
        } finally {
            set({ isFetching: false })
        }
    },

    async deleteFile(filename: string) {
        const { items, totalItems, page } = get();

        await deleteFile(filename);

        // Actualizacion optimista
        const newItems = items.filter(
            (item) => item.filename !== filename
        )

        const newTotal = Math.max(totalItems - 1, 0);

        set({
            items: newItems,
            totalItems: newTotal
        })

        if (newItems.length === 0 && page > 1) {
            set({ page: page - 1 });
            await get().fetchFiles();
        }
    }
}))