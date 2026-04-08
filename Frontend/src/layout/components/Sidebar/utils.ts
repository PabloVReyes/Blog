import type { FileData } from "@/types";

export interface MenuItem {
    id?: string | number;
    label: string;
    icon?: string;
    link: string;
    type?: string;
    file?: FileData | null;
    children?: MenuItem[];
}

interface RawMenuItem {
    id?: string | number;
    label?: string;
    icon?: string;
    link?: string;
    type?: string;
    file?: FileData | null;
    children?: RawMenuItem[];
}

export const mapTreeToMenu = (items: RawMenuItem[]): MenuItem[] =>
    items.map((item) => ({
        id: item.id,
        type: item.type ?? "page",
        label: item.label || String(item.id ?? ""),
        icon: item.icon || 'IconCircle',
        link: item.link ?? "",
        file: item.file ?? null,
        children: item.children ? mapTreeToMenu(item.children) : [],
    }));