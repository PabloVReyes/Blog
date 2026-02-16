import type { MenuItem } from "./types";

export const mapTreeToMenu = (items: any[]): MenuItem[] =>
    items.map((item) => ({
        id: item.id,
        type: item.type ? item.type : "page",
        label: item.label || item.id,
        icon: item.icon || 'IconCircle',
        link: item.link ? item.link : "",
        children: item.children ? mapTreeToMenu(item.children) : [],
    }));