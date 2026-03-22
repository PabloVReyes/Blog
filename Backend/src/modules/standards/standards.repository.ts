import { database } from "../../config/prisma";
import { PaginationProps } from "../../types/pagination";
import { logger } from "../../utils/logger";

////////////
// CREATE //
////////////

interface PostStandarRepositoryProps {
    name: string;
    description?: string | null
    isNew: boolean;
    categoryId: number
    fileName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
}

export const postStandarRepository = async ({
    name,
    description,
    isNew,
    categoryId,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PostStandarRepositoryProps) => {
    try {
        return await database.standards.create({
            data: {
                name,
                description,
                isNew,
                categoryId,
                fileName,
                filePath,
                fileSize,
                mimeType
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postStandarRepository",
                entity: "Standards",
                payload: { name, categoryId }
            },
            "Error creating standard"
        )
        throw new Error("Error al crear norma oficial")
    }
}

export const postCategoryRepository = async (name: string) => {
    try {
        return await database.standardsCategory.create({
            data: {
                name
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postCategoryRepository",
                entity: "StandardsCategory",
                payload: { name }
            },
            "Error creating category"
        )
        throw new Error("Error al crear categoria")
    }
}

//////////
// READ //
//////////

export const getCategoriesRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.standardsCategory.findMany(),
            database.standardsCategory.count()
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCategoriesRepository",
                entity: "StandardsCategory"
            },
            "Error fetching categories"
        )
        throw new Error("Error al obtener las categorias")
    }
}

export const getStandardsRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.standards.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    category: true
                }
            }),
            database.standards.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getStandardsRepository",
                entity: "Standards",
                params: { skip, take, search }
            },
            "Error fetching standards"
        )
        throw new Error("Error al obtener normas")
    }
}

export const getStandarByIdRepository = async (id: number) => {
    try {
        return await database.standards.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getStandarByIdRepository",
                entity: "Standards",
                id
            },
            "Error fetching standard by id"
        )
        throw new Error("Error al obtener norma oficial")
    }
}

////////////
// UPDATE //
////////////

export interface PutStandarRepositoryProps extends PostStandarRepositoryProps {
    id: number
}

export const putStandarRepository = async ({
    id,
    name,
    description,
    isNew,
    categoryId,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PutStandarRepositoryProps) => {
    try {
        return await database.standards.update({
            where: { id },
            data: {
                name,
                description,
                isNew,
                categoryId,
                fileName,
                filePath,
                fileSize,
                mimeType
            },
            include: {
                category: true
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putStandarRepository",
                entity: "Standards",
                id,
                payload: { name, categoryId }
            },
            "Error updating standard"
        )
        throw new Error("Error al actualizar norma oficial")
    }
}

////////////
// DELETE //
////////////

export const deleteStandarRepository = async (id: number) => {
    try {
        return await database.standards.delete({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteStandarRepository",
                entity: "Standards",
                id
            },
            "Error deleting standard"
        )
        throw new Error("Error al eliminar norma oficial")
    }
}