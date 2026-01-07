import type { PaginationState } from "@/store/paginationStore";

export interface ItemProps {
    filename: string;
    size: string;
    uploadedAt: string;
    url: string;
    type: string;
    mime: string;
}

export interface useFilesStoreProps extends PaginationState {
    isFetching: boolean;
    items: ItemProps[];
    fetchFiles: () => void;
    deleteFile: (filename: string) => void;
}

