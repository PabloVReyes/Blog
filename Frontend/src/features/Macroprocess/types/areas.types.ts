import type { ManualData } from "./manuals.types";

export interface AreaData {
    area: Area | null;
    loading: boolean;
}

export interface Area {
    id: string;
    name: string;
    category: string;
    manager: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    manuals: ManualData[];
}