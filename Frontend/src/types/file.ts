export interface FileData {
    id: string;
    name: string | null;
    path: string | null;
    size: number | null;
    mimeType: string | null;
    url: string | null;
    provider: null;
    createdAt: Date;
}
