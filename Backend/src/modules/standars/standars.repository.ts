import { database } from "@/config/prisma";
import { PaginationProps } from "@/types/pagination";

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
        return await database.standars.create({
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
        console.error("Error en postStandarRepository")
        throw new Error("Error al crear norma oficial")
    }
}

export const postCategoryRepository = async (name: string) => {
    try {
        return await database.standarsCategory.create({
            data: {
                name
            }
        })
    } catch (error) {
        console.error("Error en postCategoryRepository")
        throw new Error("Error al crear categoria")
    }
}

//////////
// READ //
//////////

export const getCategoriesRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.standarsCategory.findMany(),
            database.standars.count()
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCategoriesRepository")
        throw new Error("Error al obtener las categorias")
    }
}

export const getStandarsRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.standars.findMany({
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
            database.standars.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getStandarsRepository")
        throw new Error("Error al obtener normas")
    }
}

export const getStandarByIdRepository = async (id: number) => {
    try {
        return await database.standars.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getStandarByIdRepository")
        throw new Error("Error al obtener norma oficial")
    }
}

///
// UPDATE
//

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
        return await database.standars.update({
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
            }
        })
    } catch (error) {
        console.error("error en putStandarRepository")
        console.log("Errror al crear norma oficial")
    }
}

///
// DELETE //
/////

export const deleteStandarRepository = async (id: number) => {
    try {
        return await database.standars.delete({ where: { id } })
    } catch (error) {
        console.error("error en deleteStandarRepository")
        throw new Error("Error al eliminar norma oficial")
    }
}