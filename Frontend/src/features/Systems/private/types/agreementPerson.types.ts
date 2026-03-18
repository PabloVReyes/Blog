export interface AgreementPerson {
    id: number;
    name: string;
    type: string;
    zoneId: number;
    groupId: number;
    zone: Group;
    group: Group;
    dependents?: AgreementPerson[];
    holders?: any[];
}

export interface Group {
    id: number;
    name: string;
}

export interface AgreementPersonFilters {
    page?: number;
    limit?: number;
    search?: string;
}