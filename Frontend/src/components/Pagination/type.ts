export interface PaginationState {
    page: number;
    limit: number;
    totalItems: number;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setTotalItems: (total: number) => void;
    totalPages: () => number;
    firstItem: () => number;
    lastItem: () => number;
}