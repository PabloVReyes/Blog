export const getPagination = (page?: any, limit?: any) => {
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