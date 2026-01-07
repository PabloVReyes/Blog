import type { MenuItem } from "./type";

export const mapTreeToMenu = (items: any[]): MenuItem[] =>
    items.map((item) => ({
        id: item.id,
        label: item.label || item.id,
        icon: item.icon || 'IconCircle',
        link: item.link ? item.link : "",
        children: item.children ? mapTreeToMenu(item.children) : [],
    }));