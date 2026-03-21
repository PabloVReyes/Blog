import type { FileData } from "@/types";

// types.ts
export interface MenuItem {
    id?: string | number;
    label: string;
    icon?: string;
    link: string;
    type?: string;
    file?: FileData
    children?: MenuItem[];
}