import { database } from "../../config/prisma";
import { PaginationProps } from "../../types/pagination";
import * as schema from "./permission.schema"

////////////
// CREATE //
////////////

export const postPermissionRepository = async ({ name, description, active, key }: schema.PostPermissionsSchema) => {
    try {
        return await database.permission.create({
            data: {
                name,
                description,
                key,
                active
            }
        })
    } catch (error) {
        console.error("Error en postPermissionRepository")
        throw new Error("Error al crear permiso")
    }
}

//////////
// READ //
//////////

export const getPermissionsRepository = async ({ search, skip, take }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.permission.findMany({
                where,
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    _count: {
                        select: {
                            roles: true
                        }
                    },
                    roles: {
                        include: {
                            role: true
                        },
                        omit: {
                            roleId: true,
                            permissionId: true
                        }
                    }
                },
            }),
            database.permission.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getPermissionsRepository")
        throw new Error("Error al obtener lista de permisos")
    }
}

////////////
// UPDATE //
////////////
interface PutPermissionRepositoryProps extends schema.PostPermissionsSchema {
    id: string;
}

export const putPermissionRepository = async ({ id, name, description, active, key }: PutPermissionRepositoryProps) => {
    try {
        return await database.permission.update({
            where: {
                id
            },
            data: {
                name,
                description,
                key,
                active
            }
        })
    } catch (error) {
        console.error("Error en putPermissionRepository")
        throw new Error("Error al actualizar permiso")
    }
}

/////
// DELETE 
////

export const deletePermissionRepository = async (id: string) => {
    try {
        return await database.permission.delete({ where: { id } })
    } catch (error) {
        console.error("Error en deletePermissionRepository")
        throw new Error("Error al eliminar permiso")
    }
} 