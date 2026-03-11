import { database } from "@/config/prisma"
import { PaginationProps } from "@/types/pagination"

export const getRolesRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.role.findMany({
                where,
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.role.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getRolesRepository")
        throw new Error("Error al obtener lista de roles")
    }
}