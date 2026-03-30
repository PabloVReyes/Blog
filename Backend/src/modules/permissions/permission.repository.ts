import { database } from "../../config/prisma";
import { PaginationProps } from "../../types/pagination";
import { logger } from "../../utils/logger";
import * as schema from "./permission.schema"

////////////
// CREATE //
////////////

export const postPermissionRepository = async ({ name, description, isActive, key }: schema.PostPermissionsSchema) => {
    try {
        return await database.permission.create({
            data: {
                name,
                description,
                key,
                isActive
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postPermissionRepository",
                entity: "Permissions"
            },
            "Error updating permissions"
        )
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
        logger.error(
            {
                error,
                operation: "getPermissionsRepository",
                entity: "Permissions",
                params: { search, skip, take }
            },
            "Error fetching permissions"
        );
        throw new Error("Error al obtener lista de permisos")
    }
}

////////////
// UPDATE //
////////////

interface PutPermissionRepositoryProps extends schema.PostPermissionsSchema {
    id: string;
}

export const putPermissionRepository = async ({ id, name, description, isActive, key }: PutPermissionRepositoryProps) => {
    try {
        return await database.permission.update({
            where: {
                id
            },
            data: {
                name,
                description,
                key,
                isActive
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putPermissionRepository",
                entity: "Permissions",
                id,
                payload: { name, key, isActive }
            },
            "Error updating permission"
        );
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
        logger.error(
            {
                error,
                operation: "deletePermissionRepository",
                entity: "Permissions",
                id
            },
            "Error deleting permission"
        );
        throw new Error("Error al eliminar permiso")
    }
} 