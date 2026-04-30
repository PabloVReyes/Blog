import { database } from "../../../config/prisma"
import { PaginationProps } from "../../../types/pagination"
import { logger } from "../../../utils/logger"

////////////
// CREATE //
////////////

interface PostCbimRepositoryProps {
    code: string;
    name: string;
    description: string;
    sp?: string | null;
    fpgc?: string | null;
    cbt_cae: "CAE" | "CBT";
}

export const postCbimRepository = async ({ code, name, description, sp, fpgc, cbt_cae }: PostCbimRepositoryProps) => {
    try {
        return await database.cbim.create({
            data: {
                code,
                description,
                name,
                sp,
                fpgc,
                cbt_cae
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postCbimRepository",
                entity: "CBIM"
            },
            "Error al crear el medicamento"
        )
        throw new Error("Error al crear el medicamento")
    }
}

//////////
// READ //
//////////

export const getCbimRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { code: { contains: search } },
                    { name: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.cbim.findMany({
                where,
                orderBy: { code: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.cbim.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCbimRepository",
                entity: "CBIM"
            },
            "Error al obtener CBIM"
        )
        throw new Error("Error al obtener cuadro basico integral de medicamentos")
    }
}

////////////
// UPDATE //
////////////

interface PutCbimRepositoryProps {
    id: string;
    code: string;
    name: string;
    description: string;
    sp?: string | null;
    fpgc?: string | null;
    cbt_cae: "CAE" | "CBT";
}

export const putCbimRepository = async ({ id, code, name, description, sp, fpgc, cbt_cae }: PutCbimRepositoryProps) => {
    try {
        return await database.cbim.update({
            where: {
                id
            },
            data: {
                name,
                code,
                description,
                sp,
                fpgc,
                cbt_cae
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putCbimRepository",
                entity: "CBIM",
                id
            },
            "Error al actualizar CBIM"
        )
        throw new Error("Error al editar el medicamento")
    }
}

////////////
// DELETE //
////////////

export const deleteCbimRepository = async (id: string) => {
    try {
        await database.cbim.delete({
            where: {
                id
            },
        })

        return true
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteCbimRepository",
                entity: "CBIM",
                id
            },
            "Error al eliminar CBIM"
        )
        throw new Error("Error al eliminar el cbim")
    }
}