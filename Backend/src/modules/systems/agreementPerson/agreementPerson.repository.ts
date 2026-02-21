import { database } from "@/config/prisma";

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
                // Solo creamos el vínculo si es DEPENDENT y tenemos un ID de titular
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

        // 2. Formatear la respuesta
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
        console.error("error en putAgreementPersonRepository", error)
        throw new Error("Error al actualizar paciente de convenio")
    }
}

export const postGroupRepository = async (name: string) => {
    try {
        return await database.group.create({
            data: {
                name
            }
        })
    } catch (error) {
        console.error("error en postGroupRepository")
        throw new Error("Error al crear nuevo grupo")
    }
}

export const postZoneRepository = async (name: string) => {
    try {
        return await database.zone.create({
            data: {
                name
            }
        })
    } catch (error) {
        console.error("error en postZoneRepository")
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
                // 1. Buscar en el Titular
                { name: { contains: search } },
                ...(searchInt ? [{ id: searchInt }] : []),

                // 2. Buscar si el Titular TIENE hijos que coincidan
                // Nota: 'children' es el nombre del campo @relation en tu modelo AgreementPerson
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
                                include: {
                                    zone: true,
                                    group: true
                                }
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
            // 1. Extraemos 'children' y guardamos todo lo demás en 'rest'
            const { children, groupId, zoneId, ...rest } = person;

            // 2. Retornamos el nuevo objeto con la propiedad 'dependents' limpia
            return {
                ...rest,
                dependents: children.map(link => link.dependent)
            };
        });

        return { data, total }
    } catch (error) {
        console.error("Error en getAgreementPersonRepository", error)
        throw new Error("Error al obtener pacientes de convenio")
    }
}

interface GetAgreementPersonRepositoryProps {
    search?: string;
    take?: number;
    skip?: number;
    groupId?: number;
    zoneId?: number;
}

export const getAgreementPersonRepository = async ({ search, take, skip, groupId, zoneId }: GetAgreementPersonRepositoryProps) => {
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
                // FORZAMOS EL ORDEN POR ID AQUÍ
                orderBy: {
                    id: "asc"
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.agreementPerson.count({ where }),
        ]);

        // Transformación: Usamos el orden que ya viene de rawData
        const data = rawData.map(person => {
            const { children, parents, ...rest } = person;
            return {
                ...rest,
                // Opcional: Si quieres que los dependientes internos también estén ordenados
                dependents: children
                    .map(link => link.dependent)
                    .sort((a, b) => a.id - b.id),

                holders: parents
                    .map(link => link.parent)
                    .sort((a, b) => a.id - b.id)
            };
        });

        return { data, total };
    } catch (error) {
        console.error("Error en getAgreementPersonRepository", error)
        throw new Error("Error al obtener pacientes de convenio")
    }
}

export const getAgreementPersonByIdRepository = async (id: number) => {
    try {
        return database.agreementPerson.findUnique({
            where: { id },
            include: { _count: { select: { children: true } } }
        })
    } catch {
        console.error("Error en getAgreementPersonCountById")
        throw new Error("Error al obtener la cantidad de dependientes del titular")
    }
}

export const getGroupsRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.group.findMany({
                orderBy: { id: "asc" }
            }),
            database.group.count(),
        ])

        return { data, total }
    } catch (error) {
        console.error("error en getGroupsRepository")
        throw new Error("Error al obtener grupos")
    }
}

export const getZonesRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.zone.findMany({
                orderBy: { id: "asc" }
            }),
            database.zone.count(),
        ])

        return { data, total }
    } catch (error) {
        console.error("error en getZonesRepository")
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
        // 1. Ejecutar el update
        const personUpdated = await database.agreementPerson.update({
            where: { id },
            data: {
                name,
                groupId: group,
                zoneId: zone,
                type,
                parents: type === "HOLDER"
                    ? {
                        // SI PASA A TITULAR: Borramos todos sus vínculos con antiguos titulares
                        deleteMany: {}
                    }
                    : {
                        // SI SIGUE SIENDO DEPENDENT: Actualizamos su titular
                        deleteMany: {},
                        create: holder ? [{
                            parent: { connect: { id: holder } }
                        }] : []
                    }
            },
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
        });

        // 2. Formatear la respuesta (sin .map, ya que es un solo objeto)
        const { children, parents, ...rest } = personUpdated;

        const data = {
            ...rest,
            dependents: (children || [])
                .map(link => link.dependent)
                .sort((a, b) => a.id - b.id),

            holders: (parents || [])
                .map(link => link.parent)
                .sort((a, b) => a.id - b.id)
        };

        return data;
    } catch (error) {
        console.error("error en putAgreementPersonRepository", error)
        throw new Error("Error al actualizar paciente de convenio")
    }
}

export const deleteAgreementPersonRepository = async (id: number) => {
    try {
        return await database.agreementPerson.delete({
            where: { id }
        })
    } catch (error) {
        console.error("Error en deleteAgreementPersonRepository", error)
        throw new Error("Error al eliminar paciente de convenio")
    }
}