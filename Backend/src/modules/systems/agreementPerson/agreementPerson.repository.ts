import { database } from "../../../config/prisma"
import { logger } from "../../../utils/logger"
import { Prisma } from "@prisma/client"
import { mapAgreementPerson } from "../../../helpers/mapAgreementPerson"

const personBasicSelect = {
    id: true,
    name: true,
    type: true,
    groupId: true, 
    zoneId: true, 
    group: { select: { id: true, name: true } },
    zone: { select: { id: true, name: true } }
}

const relationSelect = {
    children: {
        select: {
            dependent: { select: personBasicSelect }
        }
    },
    parents: {
        select: {
            parent: { select: personBasicSelect }
        }
    }
}

const fullPersonSelect = {
    ...personBasicSelect,
    ...relationSelect
}

////////////
// CREATE //
////////////

interface PostAgreementPersonRepositoryProps {
    name: string;
    group: number;
    zone: number;
    type: "HOLDER" | "DEPENDENT";
    holder?: number;
}

export const postAgreementPersonRepository = async ({
    group,
    zone,
    name,
    type,
    holder
}: PostAgreementPersonRepositoryProps) => {
    try {
        const personCreated = await database.agreementPerson.create({
            data: {
                name,
                groupId: group,
                zoneId: zone,
                type,
                parents: (type === "DEPENDENT" && holder)
                    ? { create: [{ parent: { connect: { id: holder } } }] }
                    : undefined
            },
            select: fullPersonSelect
        })

        return mapAgreementPerson(personCreated)
    } catch (error) {
        logger.error({ error, operation: "postAgreementPersonRepository", payload: { name, type } }, "Error creating agreement person")
        throw new Error("Error al crear paciente de convenio")
    }
}

export const postGroupRepository = async (name: string) => {
    try {
        return await database.group.create({ data: { name } })
    } catch (error) {
        logger.error({ error, operation: "postGroupRepository", payload: { name } }, "Error creating group")
        throw new Error("Error al crear nuevo grupo")
    }
}

export const postZoneRepository = async (name: string) => {
    try {
        return await database.zone.create({ data: { name } })
    } catch (error) {
        logger.error({ error, operation: "postZoneRepository", payload: { name } }, "Error creating zone")
        throw new Error("Error al crear nueva zona")
    }
}

//////////
// READ //
//////////

interface GetAgreementPersonRepositoryProps {
    search?: string;
    take?: number;
    skip?: number;
    groupId?: number;
    zoneId?: number;
}

export const getAgreementPersonWithDependentsRepository = async ({ search, take, skip, groupId, zoneId }: GetAgreementPersonRepositoryProps) => {
    try {
        const isNumeric = !isNaN(Number(search))
        const searchInt = isNumeric ? Number(search) : null

        const where: Prisma.AgreementPersonWhereInput = {
            type: "HOLDER",
            ...(groupId && { groupId }),
            ...(zoneId && { zoneId }),
        }

        if (search) {
            where.OR = [
                { name: { contains: search } },
                ...(searchInt ? [{ id: searchInt }] : []),
                {
                    children: {
                        some: {
                            dependent: {
                                OR: [
                                    { name: { contains: search } },
                                    ...(searchInt ? [{ id: searchInt }] : []),
                                ]
                            }
                        }
                    }
                }
            ]
        }

        const [rawData, total] = await Promise.all([
            database.agreementPerson.findMany({
                where,
                select: fullPersonSelect,
                orderBy: { id: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.agreementPerson.count({ where }),
        ])

        return { data: rawData.map(mapAgreementPerson), total }
    } catch (error) {
        logger.error({ error, operation: "getAgreementPersonWithDependentsRepository" }, "Error fetching holders")
        throw new Error("Error al obtener pacientes de convenio")
    }
}

export const getAgreementPersonRepository = async ({ search, take, skip }: GetAgreementPersonRepositoryProps) => {
    try {
        const isNumeric = !isNaN(Number(search))
        const searchInt = isNumeric ? Number(search) : null

        const where: Prisma.AgreementPersonWhereInput = search ? {
            OR: [
                { name: { contains: search } },
                ...(searchInt ? [{ id: searchInt }] : []),
            ]
        } : {}

        const [rawData, total] = await Promise.all([
            database.agreementPerson.findMany({
                where,
                select: fullPersonSelect,
                orderBy: { id: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.agreementPerson.count({ where }),
        ])

        return { data: rawData.map(mapAgreementPerson), total }
    } catch (error) {
        logger.error({ error, operation: "getAgreementPersonRepository" }, "Error fetching persons")
        throw new Error("Error al obtener pacientes de convenio")
    }
}

export const getAgreementPersonByIdRepository = async (id: number) => {
    try {
        return database.agreementPerson.findUnique({
            where: { id },
            include: { _count: { select: { children: true } } }
        })
    } catch (error) {
        logger.error({ error, operation: "getAgreementPersonByIdRepository", id }, "Error fetching by id")
        throw new Error("Error al obtener paciente")
    }
}

export const getGroupsRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.group.findMany({ orderBy: { id: "asc" } }),
            database.group.count(),
        ])
        return { data, total }
    } catch (error) {
        logger.error({ error, operation: "getGroupsRepository" }, "Error fetching groups")
        throw new Error("Error al obtener grupos")
    }
}

export const getZonesRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.zone.findMany({ orderBy: { id: "asc" } }),
            database.zone.count(),
        ])
        return { data, total }
    } catch (error) {
        logger.error({ error, operation: "getZonesRepository" }, "Error fetching zones")
        throw new Error("Error al obtener zonas")
    }
}

////////////
// UPDATE //
////////////

interface PutAgreementPersonRepositoryProps {
    id: number;
    name: string;
    group: number;
    zone: number;
    type: "HOLDER" | "DEPENDENT";
    holder?: number;
}

export const putAgreementPersonRepository = async ({
    id,
    group,
    zone,
    name,
    type,
    holder
}: PutAgreementPersonRepositoryProps) => {
    try {
        const personUpdated = await database.agreementPerson.update({
            where: { id },
            data: {
                name,
                groupId: group,
                zoneId: zone,
                type,
                parents: type === "HOLDER"
                    ? { deleteMany: {} }
                    : {
                        deleteMany: {},
                        create: holder ? [{ parent: { connect: { id: holder } } }] : []
                    }
            },
            select: fullPersonSelect
        })

        return mapAgreementPerson(personUpdated)
    } catch (error) {
        logger.error({ error, operation: "putAgreementPersonRepository", id }, "Error updating person")
        throw new Error("Error al actualizar paciente de convenio")
    }
}

export const deleteAgreementPersonRepository = async (id: number) => {
    try {
        return await database.agreementPerson.delete({ where: { id } })
    } catch (error) {
        logger.error({ error, operation: "deleteAgreementPersonRepository", id }, "Error deleting person")
        throw new Error("Error al eliminar paciente de convenio")
    }
}