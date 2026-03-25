import { database } from "../../config/prisma"
import { PaginationProps } from "../../types/pagination";
import { logger } from "../../utils/logger";
import path from "path"
import fs from "fs/promises"

////////////
// CREATE //
////////////

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
        logger.error(
            { error, operation: "postShiftRepository", entity: "ShiftType" },
            "Error creating shift"
        )
        throw new Error("Error al crear turno")
    }
}

interface PostVacationRepositoryProps {
    type: "CALENDAR" | "INDEX"
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null
    shiftId: string
}

export const postVacationRepository = async ({
    type,
    file,
    shiftId
}: PostVacationRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            let fileId: string | null = null;

            if (file) {
                const createFile = await tx.file.create({
                    data: file
                })

                fileId = createFile.id
            }

            return await tx.shiftFile.create({
                data: {
                    type,
                    fileId,
                    shiftId
                }
            })
        })
    } catch (error) {
        logger.error(
            { error, operation: "postVacationRepository", entity: "ShiftFile" },
            "Error creating vacation file"
        )
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
                    shift: true,
                    file: true
                }
            }),
            database.shiftFile.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            { error, operation: "getVacationsRepository", entity: "ShiftFile" },
            "Error fetching vacations"
        )
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
            database.shiftType.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            { error, operation: "getShiftsRepository", entity: "ShiftType" },
            "Error fetching shifts"
        )
        throw new Error("Error al obtener turnos")
    }
}

export const getVacationsByIdRepository = async (id: string) => {
    try {
        return await database.shiftFile.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            { error, operation: "getVacationsByIdRepository", entity: "ShiftFile" },
            "Error fetching vacation by id"
        )
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
                    files: {
                        include: {
                            file: true
                        }
                    }
                }
            }),
            database.shiftType.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            { error, operation: "getShiftsWithVacationsRepository", entity: "ShiftType" },
            "Error fetching shifts with vacations"
        )
        throw new Error("Error al obtener turnos con vacaciones")
    }
}

////////////
// UPDATE //
////////////

interface PutShiftRepositoryProps extends PostShiftRepositoryProps {
    id: string
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
        logger.error(
            { error, operation: "putShiftRepository", entity: "ShiftType" },
            "Error updating shift"
        )
        throw new Error("Error al actualizar turno")
    }
}

export const deleteShiftRepository = async (id: string) => {
    try {
        return await database.shiftType.delete({
            where: { id }
        })
    } catch (error) {
        logger.error(
            { error, operation: "deleteShiftRepository", entity: "ShiftType" },
            "Error deleting shift"
        )
        throw new Error("Error al eliminar turno")
    }
}

interface PutVacationsRepository extends PostVacationRepositoryProps {
    id: string;
}

export const putVacationsRepository = async ({
    id,
    shiftId,
    type,
    file
}: PutVacationsRepository) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.shiftFile.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Vacaciones no encontradas")
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

            return await tx.shiftFile.update({
                where: { id },
                data: {
                    shiftId,
                    type,
                    fileId
                },
                include: {
                    shift: true,
                    file: true
                }
            })
        })
    } catch (error) {
        logger.error(
            { error, operation: "putVacationsRepository", entity: "ShiftFile" },
            "Error updating vacation"
        )
        throw new Error("Error al actualizar vacaciones")
    }
}

////////////
// DELETE //
////////////

export const deleteVacationRepository = async (id: string) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.shiftFile.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Sistema no encontrado")
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

            return await tx.shiftFile.delete({
                where: { id }
            })
        })
    } catch (error) {
        logger.error(
            { error, operation: "deleteVacationRepository", entity: "ShiftFile" },
            "Error deleting vacation"
        )
        throw new Error("Error al eliminar vacaciones")
    }
}