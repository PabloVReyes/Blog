import type { ItemProps } from "@/features/private/components/Home/Carousel/type";
import type { PaginationState } from "../paginationStore";

export interface UsePrivateHomeCarouselStoreProps extends PaginationState {
    isFetching: boolean;
    items: ItemProps[]
    fetchCarousel: () => void;
}

export interface UsePrivateHomeSectionStoreProps {
    items: ItemsProps[];
    isFetching: boolean;
    fetchSections: () => void;
}

interface ItemsProps {
    title: string
    content: string
}