import { database } from "@/config/prisma"
import { PaginationProps } from "@/types/pagination"

////////////
// CREATE //
////////////

export const postCategoryRepository = async (name: string) => {
    try {
        return await database.categoryCareProtocols.create({
            data: {
                name
            }
        })
    } catch (error) {
        console.error("error en postCategoryRepository")
        throw new Error("Error al crear categoria")
    }
}

interface PostCareProtocolsRepositoryProps {
    title: string;
    description: string;
    category: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
}

export const postCareProtocolsRepository = async ({
    title,
    description,
    category,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PostCareProtocolsRepositoryProps) => {
    try {
        return await database.careProtocols.create({
            data: {
                title,
                description,
                categoryCareProtocolsId: category,
                fileName,
                filePath,
                fileSize,
                mimeType
            }
        })
    } catch (error) {
        console.error("Error en postCareProtocolsRepository")
        throw new Error("Error al crear protocolo")
    }
}

//////////
// READ //
//////////

export const getCategoryRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.categoryCareProtocols.findMany({
                orderBy: { id: "desc" }
            }),
            database.categoryCareProtocols.count()
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCategoryRepository")
        throw new Error("Error al obtener categorias")
    }
}

export const getCareProtocolsRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { title: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.careProtocols.findMany({
                where,
                orderBy: {
                    id: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    category: true
                }
            }),
            database.careProtocols.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCareProtocols")
        throw new Error("Error al obtener protocolos")
    }
}

export const getCareProtocolByIdRepository = async (id: string) => {
    try {
        return await database.careProtocols.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getCareProtocolByIdRepository")
        throw new Error("Error al obtener protocolo")
    }
}

export const getCategoryWithCareProtocolsRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            careProtocols: {
                some: {}
            },
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.categoryCareProtocols.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    _count: {
                        select: {
                            careProtocols: true
                        }
                    },
                    careProtocols: true
                }
            }),
            database.categoryCareProtocols.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCategoryWithCareProtocolsRepository")
        throw new Error("Error al obtener categorias con protocolos")
    }
}

////////////
// UPDATE //
////////////

interface PutCareProtocolProps extends PostCareProtocolsRepositoryProps {
    id: string;
}

export const putCareProtocolRepository = async ({
    id,
    title,
    description,
    category,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PutCareProtocolProps) => {
    try {
        return await database.careProtocols.update({
            where: { id },
            data: {
                title,
                description,
                categoryCareProtocolsId: category,
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
        console.error("Error en putCareProtocolRepository")
        throw new Error("Error al actualizar el protocolo")
    }
}

////////////
// DELETE //
////////////

export const deleteCareProtocolsRepository = async (id: string) => {
    try {
        return await database.careProtocols.delete({ where: { id } })
    } catch (error) {
        console.error("Error en deleteCareProtocolsRepository")
        throw new Error("Error al eliminar el protocolo")
    }
}