export interface SystemsState {
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
export interface CIE10State extends SystemsState { }
export interface MonthlyReportsState extends SystemsState { }
export type AgreementPersonState = Omit<SystemsState, "update" | "remove"> & {
    update: (id: number, data: any) => Promise<void>;
    remove: (id: number) => Promise<void>;
}
export interface CBIMState extends SystemsState { }
export interface ClinicalPracticeGuidelinesState extends SystemsState { }
export interface PBMState extends SystemsState { }
export interface GPCState extends SystemsState { }
export interface CareProtocolsState extends SystemsState { }
export type AdverseEventsState = Omit<SystemsState, "add">