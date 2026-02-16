export interface CarouselState {
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
    update: (id: string, data: any) => Promise<void>;
    remove: (id: string) => Promise<void>;

    isLoading: boolean
}

export interface AlertState {
    items: any[]

    fetch: () => Promise<void>;
    update: (id: string, data: any) => Promise<void>;

    isLoading: boolean
}

export interface CalendarState {
    items: any[]

    fetch: () => Promise<void>;
    update: (id: string, data: any) => Promise<void>;

    isLoading: boolean
}


export interface DerechohabienciaState {
    items: any[]

    fetch: () => Promise<void>;
    update: (id: string, data: any) => Promise<void>;

    isLoading: boolean
}

export interface AccessCardState {
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
    update: (id: string, data: any) => Promise<void>;
    remove: (id: string) => Promise<void>;

    isLoading: boolean
}