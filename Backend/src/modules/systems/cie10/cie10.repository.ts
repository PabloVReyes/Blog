import { database } from "../../../config/prisma";
import { logger } from "../../../utils/logger";

////////////
// CREATE //
////////////

interface PostCie10RepositoryProps {
    id: string;
    name: string;
}

export const postCie10Repository = async ({ id, name }: PostCie10RepositoryProps) => {
    try {
        await database.cie10.create({
            data: {
                id,
                name
            }
        })

        return true
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postCie10Repository",
                entity: "CIE10",
                id
            },
            "Error al crear enfermedad"
        )
        throw new Error("Error al crear la enfermedad")
    }
}

//////////
// READ //
//////////

interface GetCie10RepositoryProps {
    search?: string;
    take?: number;
    skip?: number;
}

export const getCie10Repository = async ({ search, take, skip }: GetCie10RepositoryProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { id: { contains: search } },
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.cie10.findMany({
                where,
                orderBy: { id: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.cie10.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCie10Repository",
                entity: "CIE10",
                search
            },
            "Error al obtener enfermedades"
        )
        throw new Error("Error al obtener enfermedades")
    }
}

////////////
// UPDATE //
////////////

interface PutCie10RepositoryProps {
    id: string;
    name: string;
    code: string;
}

export const putCie10Repository = async ({ id, name, code }: PutCie10RepositoryProps) => {
    try {
        return await database.cie10.update({
            where: {
                id
            },
            data: {
                id: code,
                name
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putCie10Repository",
                entity: "CIE10",
                id,
                newCode: code
            },
            "Error al actualizar enfermedad"
        )
        throw new Error("Error al editar la enfermedad")
    }
}

////////////
// DELETE //
////////////

export const deleteCie10Repository = async (id: string) => {
    try {
        await database.cie10.delete({
            where: {
                id
            },
        })

        return true
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteCie10Repository",
                entity: "CIE10",
                id
            },
            "Error al eliminar enfermedad"
        )
        throw new Error("Error al eliminar la enfermedad")
    }
}