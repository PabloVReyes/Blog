import { database } from "../../../config/prisma"
import { PaginationProps } from "../../../types/pagination"

////////////
// CREATE //
////////////

interface PostCbimRepositoryProps {
    code: string;
    name: string;
    description: string;
    sp: string | undefined;
    fpgc: string | undefined;
    cbt_cae: "CAE" | "CBT";
}

export const postCbimRepository = async ({ code, name, description, sp, fpgc, cbt_cae }: PostCbimRepositoryProps) => {
    try {
        return await database.cbim.create({
            data: {
                code,
                description,
                name,
                sp,
                fpgc,
                cbt_cae
            }
        })
    } catch (error) {
        console.error("Error en postCbimRepository", error)
        throw new Error("Error al crear el medicamento")
    }
}

//////////
// READ //
//////////

export const getCbimRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { code: { contains: search } },
                    { name: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.cbim.findMany({
                where,
                orderBy: { code: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.cbim.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCbimRepository", error)
        throw new Error("Error al obtener cuadro basico integral de medicamentos")
    }
}

////////////
// UPDATE //
////////////

interface PutCbimRepositoryProps {
    id: string;
    code: string;
    name: string;
    description: string;
    sp: string | undefined;
    fpgc: string | undefined;
    cbt_cae: "CAE" | "CBT";
}

export const putCbimRepository = async ({ id, code, name, description, sp, fpgc, cbt_cae }: PutCbimRepositoryProps) => {
    try {
        return await database.cbim.update({
            where: {
                id
            },
            data: {
                name,
                code,
                description,
                sp,
                fpgc,
                cbt_cae
            }
        })
    } catch (error) {
        console.error("Error en putCbimRepository", error)
        throw new Error("Error al editar el medicamento")
    }
}

////////////
// DELETE //
////////////

export const deleteCbimRepository = async (id: string) => {
    try {
        await database.cbim.delete({
            where: {
                id
            },
        })

        return true
    } catch (error) {
        console.error("Error en deleteCbimRepository", error)
        throw new Error("Error al eliminar el cbim")
    }
}