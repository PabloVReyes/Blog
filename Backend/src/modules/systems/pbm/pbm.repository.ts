import { database } from "../../../config/prisma"
import { PaginationProps } from "../../../types/pagination";
import { logger } from "../../../utils/logger";

////////////
// CREATE //
////////////

interface PostPbmReporisoryProps {
    title: string;
    fileName?: string | null;
    filePath?: string | null;
    fileSize?: number | null;
    mimeType?: string | null;
}

export const postPbmRepository = async (props: PostPbmReporisoryProps) => {
    try {
        return await database.pbm.create({
            data: props
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postPbmRepository",
                entity: "PBM",
                input: props
            },
            "Error al crear algoritmo"
        )
        throw new Error("Error al crear algoritmo")
    }
}

//////////
// READ //
//////////

export const getPBMRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { title: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.pbm.findMany({
                where,
                orderBy: {
                    id: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.pbm.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getPBMRepository",
                entity: "PBM",
                params: { search, take, skip }
            },
            "Error al obtener algoritmos"
        )
        throw new Error("Error al obtener algoritmos")
    }
}

export const getPBMByIdRepository = async (id: string) => {
    try {
        return await database.pbm.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getPBMByIdRepository",
                entity: "PBM",
                id
            },
            "Error al obtener el algoritmo"
        )
        throw new Error("Error al obtener el algoritmo")
    }
}

////////////
// UPDATE //
////////////

interface PutPBMRepositoryProps extends PostPbmReporisoryProps {
    id: string;
}

export const putPBMRepository = async (props: PutPBMRepositoryProps) => {
    try {
        const { id, ...data } = props

        return await database.pbm.update({
            where: { id },
            data
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putPBMRepository",
                entity: "PBM",
                input: props
            },
            "Error al actualizar el algoritmo"
        )
        throw new Error("Error al actualizar el algoritmo")
    }
}

////////////
// DELETE //
////////////

export const deletePBMRepository = async (id: string) => {
    try {
        return await database.pbm.delete({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deletePBMRepository",
                entity: "PBM",
                id
            },
            "Error al eliminar algoritmo"
        )
        throw new Error("Error al eliminar algoritmo")
    }
}