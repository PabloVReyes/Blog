import { database } from "../../../config/prisma";
import { PaginationProps } from "../../../types/pagination";
import { logger } from "../../../utils/logger";

//////////
// READ //
//////////

interface GetCodesRepositoryProps extends PaginationProps {
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
            database.code.findMany({
                where,
                orderBy: { createdAt: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    category: true
                }
            }),
            database.code.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCodesRepository",
                entity: "Codes",
                search,
                categoryId
            },
            "Error al obtener códigos"
        )
        throw new Error("Error al obtener códigos")
    }
}

export const getCategoryRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.categoryCode.findMany({
                orderBy: { name: "asc" }
            }),
            database.categoryCode.count(),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCategoryRepository",
                entity: "CategoryCodes"
            },
            "Error al obtener categorías de códigos"
        )
        throw new Error("Error al obtener categorias")
    }
}