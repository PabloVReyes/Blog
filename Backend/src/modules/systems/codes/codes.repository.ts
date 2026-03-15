import { database } from "../../../config/prisma";
import { PaginationProps } from "../../../types/pagination";

//////////
// READ //
//////////
interface GetCodesRepositoryProps extends PaginationProps{
    categoryId?: string
}

export const getCodesRepository = async ({ search, take, skip, categoryId }: GetCodesRepositoryProps) => {
    try {
        const where = {
            ...(categoryId && {
                categoryCodesId: categoryId
            }),
            ...(search && {
                OR: [
                    { code: { contains: search } },
                    { name: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.codes.findMany({
                where,
                orderBy: { createdAt: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    category: true
                }
            }),
            database.codes.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCie10Repository", error)
        throw new Error("Error al obtener enfermedades")
    }
}

export const getCategoryRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.categoryCodes.findMany({
                orderBy: { name: "asc" }
            }),
            database.categoryCodes.count(),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCategoryRepository")
        throw new Error("Error al obtener categorias")
    }
}