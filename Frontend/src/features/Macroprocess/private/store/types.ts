import type { PaginationState } from "@/store/paginationStore";

export interface MacroprocessState extends PaginationState {
    manuals: any[]

    fetch: () => Promise<void>;
    update: (id: string, data: any) => Promise<void>;
    remove: (id: string) => Promise<void>;

    isLoading: boolean
}

export interface ManualsTypesState extends PaginationState {
    manuals: any[]

    fetch: () => Promise<void>;
    update: (id: string, data: any) => Promise<void>;

    isLoading: boolean
}

export interface AreasState extends PaginationState {
    areas: any[]

    fetch: () => Promise<void>;
    update: (id: string, data: any) => Promise<void>;

    isLoading: boolean
}