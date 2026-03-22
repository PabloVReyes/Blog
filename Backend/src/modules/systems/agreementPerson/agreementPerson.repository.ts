import { database } from "../../../config/prisma"
import { logger } from "../../../utils/logger"

////////////
// CREATE //
////////////

interface PostAgreementPersonRepositoryProps {
    name: string;
    group: number;
    zone: number
    type: "HOLDER" | "DEPENDENT"
    holder?: number,
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
                    ? {
                        create: [
                            {
                                parent: { connect: { id: holder } }
                            }
                        ]
                    }
                    : undefined
            },
            include: {
                children: {
                    include: {
                        dependent: { include: { zone: true, group: true } }
                    }
                },
                parents: {
                    include: {
                        parent: { include: { zone: true, group: true } }
                    }
                },
                zone: true,
                group: true
            },
        });

        const { children, parents, ...rest } = personCreated;

        return {
            ...rest,
            dependents: (children || [])
                .map(link => link.dependent)
                .sort((a, b) => (a.id - b.id)),
            holders: (parents || [])
                .map(link => link.parent)
                .sort((a, b) => (a.id - b.id))
        };
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postAgreementPersonRepository",
                entity: "AgreementPerson",
                payload: { name, type, group, zone }
            },
            "Error creating agreement person"
        )
        throw new Error("Error al crear paciente de convenio")
    }
}

export const postGroupRepository = async (name: string) => {
    try {
        return await database.group.create({
            data: { name }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postGroupRepository",
                entity: "Group",
                payload: { name }
            },
            "Error creating group"
        )
        throw new Error("Error al crear nuevo grupo")
    }
}

export const postZoneRepository = async (name: string) => {
    try {
        return await database.zone.create({
            data: { name }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postZoneRepository",
                entity: "Zone",
                payload: { name }
            },
            "Error creating zone"
        )
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
        const isNumeric = !isNaN(Number(search));
        const searchInt = isNumeric ? Number(search) : null;

        const where: any = {
            type: "HOLDER",
            ...(groupId && { groupId }),
            ...(zoneId && { zoneId }),
        };

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
            ];
        }

        const [rawData, total] = await Promise.all([
            database.agreementPerson.findMany({
                where,
                include: {
                    children: {
                        include: {
                            dependent: {
                                include: { zone: true, group: true }
                            }
                        }
                    },
                    zone: true,
                    group: true
                },
                orderBy: { id: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.agreementPerson.count({ where }),
        ]);

        const data = rawData.map(person => {
            const { children, groupId, zoneId, ...rest } = person;

            return {
                ...rest,
                dependents: children.map(link => link.dependent)
            };
        });

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getAgreementPersonWithDependentsRepository",
                entity: "AgreementPerson",
                params: { search, take, skip, groupId, zoneId }
            },
            "Error fetching agreement persons with dependents"
        )
        throw new Error("Error al obtener pacientes de convenio")
    }
}

export const getAgreementPersonRepository = async ({ search, take, skip }: GetAgreementPersonRepositoryProps) => {
    try {
        const isNumeric = !isNaN(Number(search));
        const searchInt = isNumeric ? Number(search) : null;

        const where = search ? {
            OR: [
                { name: { contains: search } },
                ...(searchInt ? [{ id: searchInt }] : []),
            ]
        } : {};

        const [rawData, total] = await Promise.all([
            database.agreementPerson.findMany({
                where,
                include: {
                    children: {
                        include: {
                            dependent: {
                                include: { zone: true, group: true }
                            }
                        }
                    },
                    parents: {
                        include: {
                            parent: {
                                include: { zone: true, group: true }
                            }
                        }
                    },
                    zone: true,
                    group: true
                },
                orderBy: { id: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.agreementPerson.count({ where }),
        ]);

        const data = rawData.map(person => {
            const { children, parents, ...rest } = person;
            return {
                ...rest,
                dependents: children.map(link => link.dependent).sort((a, b) => a.id - b.id),
                holders: parents.map(link => link.parent).sort((a, b) => a.id - b.id)
            };
        });

        return { data, total };
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getAgreementPersonRepository",
                entity: "AgreementPerson",
                params: { search, take, skip }
            },
            "Error fetching agreement persons"
        )
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
        logger.error(
            {
                error,
                operation: "getAgreementPersonByIdRepository",
                entity: "AgreementPerson",
                id
            },
            "Error fetching agreement person by id"
        )
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
        logger.error(
            {
                error,
                operation: "getGroupsRepository",
                entity: "Group"
            },
            "Error fetching groups"
        )
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
        logger.error(
            {
                error,
                operation: "getZonesRepository",
                entity: "Zone"
            },
            "Error fetching zones"
        )
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
    zone: number
    type: "HOLDER" | "DEPENDENT"
    holder?: number,
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
                        create: holder ? [{
                            parent: { connect: { id: holder } }
                        }] : []
                    }
            },
            include: {
                children: { include: { dependent: { include: { zone: true, group: true } } } },
                parents: { include: { parent: { include: { zone: true, group: true } } } },
                zone: true,
                group: true
            },
        });

        const { children, parents, ...rest } = personUpdated;

        return {
            ...rest,
            dependents: (children || []).map(link => link.dependent).sort((a, b) => a.id - b.id),
            holders: (parents || []).map(link => link.parent).sort((a, b) => a.id - b.id)
        };

    } catch (error) {
        logger.error(
            {
                error,
                operation: "putAgreementPersonRepository",
                entity: "AgreementPerson",
                id,
                payload: { name, type, group, zone }
            },
            "Error updating agreement person"
        )
        throw new Error("Error al actualizar paciente de convenio")
    }
}

export const deleteAgreementPersonRepository = async (id: number) => {
    try {
        return await database.agreementPerson.delete({
            where: { id }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteAgreementPersonRepository",
                entity: "AgreementPerson",
                id
            },
            "Error deleting agreement person"
        )
        throw new Error("Error al eliminar paciente de convenio")
    }
}