import { database } from "../../config/prisma";
import { PaginationProps } from "../../types/pagination";

////
// CREATE /
//

interface PostJuristicsRepositoryProps {
    name: string;
    description?: string | null
    isNew: boolean;
    fileName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
}

export const postJuristicsRepository = async ({
    name,
    description,
    isNew,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PostJuristicsRepositoryProps) => {
    try {
        return await database.juristics.create({
            data: {
                name,
                description,
                isNew,
                fileName,
                filePath,
                fileSize,
                mimeType
            }
        })
    } catch (error) {
        console.error("Error en postJuristicsRepository")
        throw new Error("Error al crear disposición juridica")
    }
}

//////////
// READ //
//////////

export const getJuristicsRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.juristics.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.juristics.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getJuristicsRepository")
        throw new Error("Error al obtener las disposiciones juridicas")
    }
}

export const getJuristicsByIdRepository = async (id: number) => {
    try {
        return await database.juristics.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getJuristicsByIdRepository")
        throw new Error("Error al obtener disposición juridica")
    }
}

//
// UPDATE 
//

export interface PutJuristicsRepositoryProps extends PostJuristicsRepositoryProps {
    id: number
}

export const putJuristicsRepository = async ({
    id,
    name,
    description,
    isNew,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PutJuristicsRepositoryProps) => {
    try {
        return await database.juristics.update({
            where: { id },
            data: {
                name,
                description,
                isNew,
                fileName,
                filePath,
                fileSize,
                mimeType
            }
        })
    } catch (error) {
        console.error("Error en putJuristicsRepository")
        throw new Error("Error al actualizar dispocisión juridica")
    }
}

///
// DELETE 
/////

export const deleteJuristicsRepository = async (id: number) => {
    try {
        return await database.juristics.delete({ where: { id } })
    } catch (error) {
        console.error("error en deleteJuristicsRepository")
        throw new Error("Error al eliminar disposición juridica")
    }
}