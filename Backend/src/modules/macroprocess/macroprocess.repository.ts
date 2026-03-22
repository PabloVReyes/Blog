import { database } from "../../config/prisma"
import { PaginationProps } from "../../types/pagination"
import { logger } from "../../utils/logger"
import * as path from "path"
import * as fs from "fs/promises"

//////////
// READ //
//////////

export const getAreaWithManualsRepository = async (id: string) => {
    try {
        return await database.area.findUnique({
            where: {
                id
            },
            include: {
                manuals: {
                    include: {
                        manualType: true,
                        file: true
                    },
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        })

    } catch (error) {
        logger.error(
            {
                error,
                operation: "getAreaWithManualsRepository",
                entity: "Macroprocess Area"
            },
            "Error fetching macroprocess area"
        )
        throw new Error("Error al crear area")
    }
}

export const getManualsWithAreaRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    {
                        area: {
                            name: { contains: search }
                        }
                    },
                    {
                        manualType: {
                            name: { contains: search }
                        }
                    },
                ]
            }),
        }

        const [data, total] = await Promise.all([
            database.manual.findMany({
                where,
                orderBy: {
                    id: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    area: true,
                    manualType: true,
                    file: true
                }
            }),
            database.manual.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getManualsWithAreaRepository",
                entity: "Macroprocess Manual"
            },
            "Error fetching macroprocess manual"
        )
        throw new Error("Error al obtener manuales")
    }
}


export const getManualQuery = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = database.manual.findUnique({
                where: {
                    id
                }
            })

            resolve(data)
        } catch (error) {
            logger.error(
                {
                    error,
                    operation: "getManualQuery",
                    entity: "Manual"
                },
                "Error fetching manual"
            )
            reject(false)
        }
    })
}

export const getManualByTypeRepository = async (type: string) => {
    try {
        return await database.manual.findFirst({
            where: {
                manualTypeId: type
            },
            include: {
                manualType: true,
                file: true
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getManualByTypeRepository",
                entity: "Macroprocess Manual"
            },
            "Error fetching macroprocess manual type by id"
        )
        throw new Error("Error al obtener manual por tipo")
    }
}

export const getManualByIdRepository = async (id: string) => {
    try {
        return await database.manual.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getManualByIdRepository",
                entity: "Macroprocess Manual"
            },
            "Error fetching macroprocess manual by id"
        )
        throw new Error("Error al encontrar manual")
    }
}

export const getManualsTypeRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.manualType.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.manualType.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getManualsTypeRepository",
                entity: "Macroprocess Manual"
            },
            "Error fetching macroprocess manual"
        )
        throw new Error("Error al obtener los tipos de manuales")
    }
}

export const getAreasRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.area.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.area.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getAreasRepository",
                entity: "Macroprocess Area"
            },
            "Error fetching macroprocess area"
        )
        throw new Error("Error al obtener areas")
    }
}

////////////
// UPDATE //
////////////

interface putManualTypeQueryProps {
    id: string;
    name: string;
    code: string;
    color: string;
}

export const putManualTypeRepository = async ({ id, name, code, color }: putManualTypeQueryProps) => {
    try {
        return await database.manualType.update({
            where: { id },
            data: {
                id: code,
                name,
                color
            }
        })

    } catch (error) {
        logger.error(
            {
                error,
                operation: "putManualTypeRepository",
                entity: "Macroprocess Manual Type"
            },
            "Error updating macroprocess manual type"
        )
        throw new Error("Error al actualizar el tipo de manual")
    }
}

interface putManualQueryProps {
    id: string;
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null
}

interface putAreaQueryProps {
    id: string;
    name: string;
}

export const putAreaRepository = ({ id, name }: putAreaQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.area.update({
                where: { id },
                data: {
                    name
                }
            })

            resolve(data)
        } catch (error) {
            logger.error(
                {
                    error,
                    operation: "putAreaRepository",
                    entity: "Macroprocess Area"
                },
                "Error updating macroprocess area"
            )
            reject(false)
        }
    })
}

export const putManualRepository = async ({ id, file }: putManualQueryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.manual.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Manual no encontrado")
            }

            let fileId = current.fileId
            const uploadsPath = path.join(process.cwd(), 'uploads');

            if (file) {
                if (current.file?.path) {
                    try {
                        const absolutePath = path.join(uploadsPath, current.file.path)
                        await fs.unlink(absolutePath)
                    } catch (_) { }

                    await tx.file.delete({
                        where: { id: current.file.id }
                    })
                }

                const newFile = await tx.file.create({
                    data: file
                })

                fileId = newFile.id
            }

            return await tx.manual.update({
                where: { id },
                data: {
                    fileId
                },
                include: {
                    file: true
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putManualRepository",
                entity: "Macroprocess Manual"
            },
            "Error updating macroprocess manual"
        )
        throw new Error("Error al actualizar manual")
    }
}

////////////
// DELETE //
////////////

export const deleteManualRepository = async (id: string) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.manual.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Manual no encontrado")
            }

            const uploadsPath = path.join(process.cwd(), 'uploads')

            if (current.file?.path) {
                try {
                    await fs.unlink(path.join(uploadsPath, current.file.path))
                } catch (_) { }

                await tx.file.delete({
                    where: { id: current.file.id }
                })
            }

            return await tx.manual.update({
                where: { id },
                data: {
                    fileId: null
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteManualRepository",
                entity: "Macroprocess",
                id
            },
            "Error deleting manual"
        )
        throw new Error("Error al eliminar manual")
    }
}