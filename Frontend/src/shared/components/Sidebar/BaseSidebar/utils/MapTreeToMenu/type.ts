export interface MenuItem {
    id: string;
    label: string;
    icon: string;         
    link?: string;
    children?: MenuItem[];
}