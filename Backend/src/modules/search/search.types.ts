export interface SearchResponse {
    id: string;
    name?: string | null;
    acronym?: string | null;
    description?: string;
    icon: string;
    color: string;
    url?: string | null;
    type?: string | null,
    createdAt: Date,
    file?: {
        id: string
    } | null;
}