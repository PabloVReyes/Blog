export interface Directory {
    id: string;
    phone: string;
    boss: null | string;
    email: null;
    name: string;
    secretary: null | string;
    levelId: string;
    level: Level;
}

export interface Level {
    id: string;
    name: string;
}

export interface DirectoryFilters {
    page?: number
    limit?: number
    search?: string
} 
