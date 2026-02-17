import { database } from "@/config/prisma";

////////////
// CREATE //
////////////

interface PostCie10RepositoryProps {
    id: string;
    name: string;
}

export const postCie10Repository = async ({ id, name }: PostCie10RepositoryProps) => {
    try {
        await database.cie10.create({
            data: {
                id,
                name
            }
        })

        return true
    } catch (error) {
        console.error("Error en postCie10Repository", error)
        throw new Error("Error al crear el enfermedad")
    }
}

//////////
// READ //
//////////

interface GetCie10RepositoryProps {
    search?: string;
    take?: number;
    skip?: number;
}

export const getCie10Repository = async ({ search, take, skip }: GetCie10RepositoryProps) => {
    const where = {
        ...(search && {
            OR: [
                { id: { contains: search } },
                { name: { contains: search } },
            ],
        }),
    }

    const [data, total] = await Promise.all([
        database.cie10.findMany({
            where,
            orderBy: { id: "asc" },
            ...(take !== undefined && { take }),
            ...(skip !== undefined && { skip }),
        }),
        database.cie10.count({ where }),
    ])

    return { data, total }
}

////////////
// UPDATE //
////////////

interface PutCie10RepositoryProps {
    id: string;
    name: string;
    code: string;
}

export const putCie10Repository = async ({ id, name, code }: PutCie10RepositoryProps) => {
    try {
        return await database.cie10.update({
            where: {
                id
            },
            data: {
                id: code,
                name
            }
        })
    } catch (error) {
        console.error("Error en postCie10Repository", error)
        throw new Error("Error al crear el enfermedad")
    }
}

////////////
// UPDATE //
////////////

export const deleteCie10Repository = async (id: string) => {
    try {
        await database.cie10.delete({
            where: {
                id
            },
        })
        
        return true
    } catch (error) {
        console.error("Error en postCie10Repository", error)
        throw new Error("Error al crear el enfermedad")
    }
}
