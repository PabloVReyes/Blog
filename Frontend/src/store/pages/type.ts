import type { PaginationState } from "@/components/Pagination/type";
import type { ItemProps } from "@/features/private/components/Home/Carousel/type";

export interface UsePrivateHomeCarouselProps extends PaginationState {
    isFetching: boolean;
    items: ItemProps[]
    fetchCarousel: () => void;
}

