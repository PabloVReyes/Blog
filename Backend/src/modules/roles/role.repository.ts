import { database } from "../../config/prisma"
import { PaginationProps } from "../../types/pagination"
import * as schema from "./role.schema"

////////////
// CREATE //
////////////

export const postRoleRepository = async ({ name, description, permissions }: schema.PostRoleSchema) => {
    try {
        return await database.role.create({
            data: {
                name,
                description,
                permissions: {
                    create: permissions.map((permissionId) => ({
                        permission: {
                            connect: { id: permissionId }
                        }
                    }))
                }
            }
        })
    } catch (error) {
        console.error("Error en postRoleRepository")
        throw new Error("Error al crear rol")
    }
}

//////////
// READ //
//////////

export const getRolesRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.role.findMany({
                where,
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    _count: {
                        select: {
                            users: true,
                            permissions: true,
                        }
                    },
                    permissions: {
                        include: {
                            permission: true
                        },
                        omit: {
                            roleId: true,
                            permissionId: true
                        }
                    }
                }
            }),
            database.role.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getRolesRepository")
        throw new Error("Error al obtener lista de roles")
    }
}

////
// UPDATE //
///
interface PutRoleRepositoryProps extends schema.PutRoleSchema {
    id: string;
}

export const putRoleRepository = async ({ id, name, description, permissions }: PutRoleRepositoryProps) => {
    try {
        const currentPermissions = await database.rolePermission.findMany({
            where: { roleId: id },
            select: { permissionId: true }
        })

        const currentIds = currentPermissions.map(p => p.permissionId)

        const currentSet = new Set(currentIds)
        const newSet = new Set(permissions)

        const toAdd = permissions.filter(id => !currentSet.has(id))
        const toRemove = currentIds.filter(id => !newSet.has(id))

        await database.$transaction([

            database.role.update({
                where: { id },
                data: {
                    name,
                    description
                }
            }),

            database.rolePermission.deleteMany({
                where: {
                    roleId: id,
                    permissionId: { in: toRemove }
                }
            }),

            database.rolePermission.createMany({
                data: toAdd.map(permissionId => ({
                    roleId: id,
                    permissionId
                }))
            })

        ])

        return database.role.findUnique({
            where: { id },
            include: {
                permissions: {
                    include: {
                        permission: true
                    }
                }
            }
        })
    } catch (error) {
        console.error("Error en putRoleRepository")
        throw new Error("Error al actualizar rol")
    }
}

////////////
// DELETE //
////////////

export const deleteRoleRepository = async (id: string) => {
    try {
        return await database.$transaction(async (tx) => {

            await tx.rolePermission.deleteMany({
                where: { roleId: id }
            });

            await tx.userRole.deleteMany({
                where: { roleId: id }
            });

            return await tx.role.delete({
                where: { id }
            });

        });
    } catch (error) {
        console.error("Error en deleteRoleRepository")
        throw new Error("Error al eliminar rol")
    }
} 