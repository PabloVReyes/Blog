import { database } from "../../config/prisma"
import { PaginationProps } from "../../types/pagination"
import { logger } from "../../utils/logger"

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
                        manualType: true
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
                    manualType: true
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
                manualType: true
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
    fileName?: string | null;
    filePath?: string | null;
    fileSize?: number | null;
    mimeType?: string | null;
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

export const putManualRepository = ({ id, fileName, filePath, fileSize, mimeType }: putManualQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.manual.update({
                where: {
                    id
                },
                data: {
                    fileName,
                    filePath,
                    fileSize,
                    mimeType
                },
                include: {
                    manualType: true
                }
            })

            resolve(data)
        } catch (error) {
            logger.error(
                {
                    error,
                    operation: "putManualRepository",
                    entity: "Macroprocess Manual"
                },
                "Error updating macroprocess manual"
            )
            reject(false)
        }
    })
}
