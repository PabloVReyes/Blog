import { database } from "@/config/prisma"
import { PaginationProps } from "@/types/pagination";

////////////
// CREATE //
////////////

interface PostPbmReporisoryProps {
    title: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
}

export const postPbmRepository = async ({
    title,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PostPbmReporisoryProps) => {
    try {
        return await database.pbm.create({
            data: {
                title,
                fileName,
                filePath,
                fileSize,
                mimeType
            }
        })
    } catch (error) {
        console.error("Error en PostPbmReporisoryProps")
        throw new Error("Error al crear Algoritmo")
    }
}

// export const postCategoryRepository = async (name: string) => {
//     try {
//         return await database.category.create({
//             data: {
//                 name
//             }
//         })
//     } catch (error) {
//         console.error("Error en postCategoryRepository")
//         throw new Error("Error al crear nueva categoria")
//     }
// }

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
        console.error("Error en getPbmRepository")
        throw new Error("Error al obtener algoritmos")
    }
}

export const getPBMByIdRepository = async (id: string) => {
    try {
        return await database.pbm.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getPBMByIdRepository")
        throw new Error("Error al obtener el algoritmo")
    }
}

////////////
// UPDATE //
////////////

interface PutPBMRepositoryProps extends PostPbmReporisoryProps {
    id: string;
}

export const putPBMRepository = async ({
    id,
    title,
    fileName,
    filePath,
    fileSize,
    mimeType,
}: PutPBMRepositoryProps) => {
    try {
        return await database.pbm.update({
            where: { id },
            data: {
                title,
                fileName,
                filePath,
                fileSize,
                mimeType,
            },
        })
    } catch (error) {
        console.error("error en PutPBMRepositoryProps")
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
        console.error("Error en deletePBMRepository", error)
        throw new Error("Error al eliminar algoritmo")
    }
}