import { database } from "@/database/config"

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

interface getManualsWithAreaQueryProps {
    skip: number;
    take: number;
    search: string;
}

export const getManualsWithAreaQuery = ({ skip, take, search }: getManualsWithAreaQueryProps) => {
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

            const data = await database.manual.findMany({
                where: whereCondition,
                include: {
                    area: true,
                    manualType: true
                },
                orderBy: { createdAt: "desc" },
                skip,
                take
            })

            resolve(data)
        } catch (error) {
            console.error("Error en getManualsWithAreaQuery", error)
            reject([])
        }
    })
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
    storedName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
}

export const putManualQuery = ({ id, fileName, storedName, filePath, fileSize, mimeType }: putManualQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.manual.update({
                where: {
                    id
                },
                data: {
                    fileName,
                    storedName,
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

export const deleteManualQuery = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.manual.update({
                where: { id },
                data: {
                    fileName: "Sin manual",
                    storedName: null,
                    filePath: null,
                    fileSize: null,
                    mimeType: null
                },
                include: {
                    manualType: true
                }
            })

            resolve(data)
        } catch (error) {
            console.error("Error en deleteManualQuery", error)
            reject(false)
        }
    })
}

export const getManualByIdQuery = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.manual.findUnique({
                where: { id }
            })

            resolve(data)
        } catch (error) {
            console.error("Error en deleteManualQuery", error)
            reject(false)
        }
    })
}

interface getManualsTypeQueryProps {
    skip: number;
    take: number;
    search: string;
}

export const getManualsTypeQuery = ({ skip, take, search }: getManualsTypeQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {}

            if (search && search.trim() != "") {
                whereCondition = {
                    OR: [
                        { name: { contains: search } },
                    ]
                }
            }

            const data = await database.manualType.findMany({
                where: whereCondition,
                orderBy: { createdAt: "desc" },
                skip,
                take
            })

            resolve(data)
        } catch (error) {
            console.error("Error en getManualsTypeQuery", error)
            reject([])
        }
    })
}

export const getManualsTypeCountQuery = (search: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {}

            if (search && search.trim() != "") {
                whereCondition = {
                    OR: [
                        { name: { contains: search } },
                    ]
                }
            }

            const data = await database.manualType.count({
                where: whereCondition,
            })

            resolve(data)

        } catch (error) {
            console.error("Error en getManualsTypeCountQuery", error)
            reject(0)
        }
    })
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

export const getAreasQuery = ({ skip, take, search }: getAreasQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {}

            if (search && search.trim() != "") {
                whereCondition = {
                    OR: [
                        { name: { contains: search } },
                    ]
                }
            }

            const data = await database.area.findMany({
                where: whereCondition,
                orderBy: { createdAt: "desc" },
                skip,
                take
            })

            resolve(data)
        } catch (error) {
            console.error("error en getAreasQuery", error)
            reject([])
        }
    })
}

export const getAreasCountQuery = (search: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {}

            if (search && search.trim() != "") {
                whereCondition = {
                    OR: [
                        { name: { contains: search } },
                    ]
                }
            }

            const data = await database.area.count({
                where: whereCondition,
            })

            resolve(data)
        } catch (error) {
            console.error("Error en getAreasCountQuery", error)
            reject(0)
        }
    })
}

interface putAreaQueryProps {
    id: string;
    name: string;
}

export const putAreaQuery = ({id, name}: putAreaQueryProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await database.area.update({
                where: {id},
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