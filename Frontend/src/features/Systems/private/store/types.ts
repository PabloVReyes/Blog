import type { PaginationState } from "@/store/paginationStore";
import type { SystemProps } from "../../types";

export interface SystemsState extends PaginationState {
    systems: SystemProps[]

    fetch: () => Promise<void>;
    update: (id: string, data: SystemProps) => Promise<void>;
    add: (data: SystemProps) => Promise<void>;
    remove: (id: string) => Promise<void>;

    isLoading: boolean
}