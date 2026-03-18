export interface Data {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id: number;
    name: string;
    type: string;
    zone: Group;
    group: Group;
    dependents: Dependent[];
}

export interface Dependent {
    id: number;
    name: string;
    type: string;
    zoneId: number;
    groupId: number;
    zone: Group;
    group: Zone;
}

export interface Group {
    id: number;
    name: string;
}

export interface Zone {
    id: number;
    name: string;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    firstItem: number;
    lastItem: number;
}
