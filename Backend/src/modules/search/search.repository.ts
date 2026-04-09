import { database } from "../../config/prisma"
import { PaginationProps } from "../../types/pagination"
import { logger } from "../../utils/logger"

export const getSearchSystemRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { acronym: { contains: search } },
                    { name: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.system.findMany({
                where,
                orderBy: { createdAt: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: { file: true }
            }),
            database.system.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getSearchSystemRepository",
                entity: "Search",
                params: { search, take, skip }
            },
            "Error fetching systems"
        )
        throw new Error("Error al obtener sistemas")
    }
}