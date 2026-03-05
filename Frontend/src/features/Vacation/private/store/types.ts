export interface ShiftState {
    // Elementos
    items: any[]
    totalItems: number;

    // Paginacion
    totalPages: number;
    page: number
    setPage: (page: number) => void;
    limit: number;
    setLimit: (limit: number) => void;
    firstItem: number;
    lastItem: number;

    // Filtros
    search: string;
    setSearch: (search: string) => void;

    fetch: () => Promise<void>;
    add: (data: any) => Promise<void>
    update: (id: string | number, data: any) => Promise<void>;
    remove: (id: string | number) => Promise<void>;

    isLoading: boolean
}

export interface VacationState extends ShiftState { }