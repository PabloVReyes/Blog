export interface Data {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id: string;
    code: string;
    name: string;
    description: string;
    sp: null;
    fpgc: null;
    cbt_cae: "CBT" | "CAE";
    createdAt: Date;
    updatedAt: Date;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    firstItem: number;
    lastItem: number;
}
