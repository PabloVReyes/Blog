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