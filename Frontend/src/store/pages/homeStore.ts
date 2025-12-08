import { getAllCarousel, getAllCarouselCount } from "@/api/carousel";
import { create } from "zustand";
import { type UsePrivateHomeCarouselProps } from "./type";

export const usePrivateHomeCarouselStore = create<UsePrivateHomeCarouselProps>((set, get) => ({
    page: 1,
    limit: 10,
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

    async fetchCarousel() {
        const {page, limit, search} = get();

        try {
            const list = await getAllCarousel(page, limit, search)
            const count = await getAllCarouselCount(search)

            set({ items: list, totalItems: count })
        } finally {
            set({ isFetching: false })
        }
    }
}))