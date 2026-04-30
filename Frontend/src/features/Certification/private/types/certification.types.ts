export interface Section {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export interface Certification {
    id: number
    name: string
    description: string
    isNew: boolean

    fileName: string
    filePath: string
    fileSize: number
    mimeType: string

    sectionId: number
    section: Section

    createdAt: string
    updatedAt: string
}

export interface CertificationFilters {
    page?: number;
    limit?: number;
    search?: string;
    [key: string]: any;
}