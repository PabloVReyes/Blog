// types.ts
export interface MenuItem {
    id?: string | number;
    label: string;
    icon?: string;
    link: string;
    type?: string;
    children?: MenuItem[];
}