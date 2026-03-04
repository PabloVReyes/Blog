import { database } from "@/config/prisma"
import { PaginationProps } from "@/types/pagination"

export const getAreaWithManualsQuery = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.area.findUnique({
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

            resolve(data)
        } catch (error) {
            console.error("Error en getAreaWithManualsQuery", error)
            reject([])
        }
    })
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
        console.error("Error en getManualsWithAreaQuery", error)
        throw new Error("Error al obtener manuales")
    }
}

export const getManualsWithAreaCountQuery = (search: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {}

            if (search && search.trim() != "") {
                whereCondition = {
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
                }
            }

            const data = await database.manual.count({
                where: whereCondition,
                orderBy: { createdAt: "desc" },
            })

            resolve(data)
        } catch (error) {
            console.error("Error en getManualsWithAreaCountQuery", error)
            reject(0)
        }
    })
}

interface putManualQueryProps {
    id: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
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
            console.error("error en getManualQuery", error)
            reject(false)
        }
    })
}

export const getManualByTypeQuery = (type: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.manual.findFirst({
                where: {
                    manualTypeId: type
                },
                include: {
                    manualType: true
                }
            })

            resolve(data)
        } catch (error) {
            console.error("error en getManualByTypeQuery", error)
            reject([])
        }
    })
}

export const getManualByIdRepository = async (id: string) => {
    try {
        return await database.manual.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en deleteManualQuery", error)
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
        console.error("Error en getManualsTypeQuery", error)
        throw new Error("Error al obtener los tipos de manuales")
    }
}

interface putManualTypeQueryProps {
    id: string;
    name: string;
    code: string;
    color: string;
}

export const putManualTypeQuery = ({ id, name, code, color }: putManualTypeQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.manualType.update({
                where: { id },
                data: {
                    id: code,
                    name,
                    color
                }
            })

            resolve(data)
        } catch (error) {
            console.error("Error en putManualTypeQuery", error)
            reject(false)
        }
    })
}

interface getAreasQueryProps {
    skip: number;
    take: number;
    search: string;
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
        console.error("error en getAreasRepository", error)
        throw new Error("Error al obtener areas")
    }
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
            console.error("error en putAreaQuery", error)
            reject(false)
        }
    })
}

////////////
// UPDATE //
////////////

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
        } catch {
            console.error("error en putManualQuery")
            reject(false)
        }
    })
}
