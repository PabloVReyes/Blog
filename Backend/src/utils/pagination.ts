type Pagination = {
    skip?: number
    take?: number
}

export const getPagination = (
    page?: string | number,
    limit?: string | number
): Pagination => {

    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || undefined

    if (!limitNumber) {
        return { skip: undefined, take: undefined }
    }

    return {
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber
    }
}

type PaginationMeta = {
    total: number
    page: number
    limit: number
    totalPages: number
    firstItem: number
    lastItem: number
}

export const buildPaginationMeta = (
    total: number,
    page?: number,
    limit?: number
): PaginationMeta => {
    const safePage = Number.isInteger(page) && page! > 0 ? page! : 1
    const safeLimit = Number.isInteger(limit) && limit! > 0 ? limit! : total || 1

    const totalPages = safeLimit > 0 ? Math.ceil(total / safeLimit) : 1

    return {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages,
        firstItem: total > 0 ? (safePage - 1) * safeLimit + 1 : 0,
        lastItem: total > 0 ? Math.min(total, safeLimit * safePage) : 0
    }
}