//////////////
// SETTINGS //
//////////////

export type ThemeType = "auto" | "dark" | "light";

export interface SettingState {
    settings: Record<string, string>;
    title: string;
    color: string;
    theme: ThemeType;
    favicon?: string;

    setSettings: (settings: Record<string, string>) => void;
    setTitle: (title: string) => void;
    setColor: (color: string) => void;
    setTheme: (theme: ThemeType) => void;
    setFavicon: (url: string) => void;

    loadSettings: () => Promise<void>;
    saveSetting: (name: string, value: string) => Promise<void>;
}

export interface UserState {
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
    update: (id: string | number, data: any) => Promise<void>;
    remove: (id: string | number) => Promise<void>;

    isLoading: boolean
}

export interface PermissionsState extends UserState { }
export interface RolesState extends UserState { }