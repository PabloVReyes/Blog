import { database } from "../../config/prisma"
import { PaginationProps } from "../../types/pagination";

/////
// CREATE //
//

interface PostShiftRepositoryProps {
    name: string;
    icon: string;
    color: string;
}

export const postShiftRepository = async ({ name, icon, color }: PostShiftRepositoryProps) => {
    try {
        return await database.shiftType.create({
            data: {
                name,
                icon,
                color
            }
        })
    } catch (error) {
        console.error("Error en postShiftRepository")
        throw new Error("Error al crear turno")
    }
}

interface PostVacationRepositoryProps {
    type: "CALENDAR" | "INDEX"
    fileName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
    shiftId: number
}

export const postVacationRepository = async ({
    type,
    fileName,
    filePath,
    fileSize,
    mimeType,
    shiftId
}: PostVacationRepositoryProps) => {
    try {
        return await database.shiftFile.create({
            data: {
                type,
                fileName,
                filePath,
                fileSize,
                mimeType,
                shiftId
            }
        })
    } catch (error) {
        console.error("Error en postVacationRepository", error)
        throw new Error("Error al crear vacaciones")
    }
}

////
// READ //
////

export const getVacationsRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { shift: { name: { contains: search } } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.shiftFile.findMany({
                where,
                orderBy: { createdAt: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    shift: true
                }
            }),
            database.shiftFile.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getVacationsRepository")
        throw new Error("Error al obtener vacaciones")
    }
}

export const getShiftsRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.shiftType.findMany({
                where,
                orderBy: { createdAt: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.downloadFile.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getShiftsRepository")
        throw new Error("Error al obtener turnos")
    }
}

export const getVacationsByIdRepository = async (id: number) => {
    try {
        return await database.shiftFile.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getVacationsByIdRepository")
        throw new Error("Error al obtener vacaciones")
    }
}

export const getShiftsWithVacationsRepository = async ({ skip, search, take }: PaginationProps) => {
    try {
        const where = {
            files: {
                some: {}
            },
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.shiftType.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    files: true
                }
            }),
            database.shiftType.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getShiftsWithVacationsRepository")
        throw new Error("Error al obtener turnos con vacaciones")
    }
}

///
// UPDATE /
//

interface PutShiftRepositoryProps extends PostShiftRepositoryProps {
    id: number
}

export const putShiftRepository = async ({ id, name, color, icon }: PutShiftRepositoryProps) => {
    try {
        return await database.shiftType.update({
            where: {
                id
            },
            data: {
                icon,
                name,
                color
            }
        })
    } catch (error) {
        console.error("Error en putShiftRepository")
        throw new Error("Error al actualizar turno")
    }
}

export const deleteShiftRepository = async (id: number) => {
    try {
        return await database.shiftType.delete({
            where: { id }
        })
    } catch (error) {
        console.error("Error en deleteShiftRepository")
        throw new Error("Error al eliminar turno")
    }
}

interface PutVacationsRepository extends PostVacationRepositoryProps {
    id: number;
}

export const putVacationsRepository = async ({
    id,
    shiftId,
    type,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PutVacationsRepository) => {
    try {
        return await database.shiftFile.update({
            where: { id },
            data: {
                shiftId,
                type,
                mimeType,
                fileName,
                filePath,
                fileSize
            },
            include: {
                shift: true
            }
        })
    } catch (error) {
        console.error("error en putVacationsRepository", error)
        throw new Error("Error al actualizar vacaciones")
    }
}

//
// DELETE
///

export const deleteVacationRepository = async (id: number) => {
    try {
        return await database.shiftFile.delete({ where: { id } })
    } catch (error) {
        console.error("Error en deleteVacationRepository")
        throw new Error("Error al eliminar vacaciones")
    }
}