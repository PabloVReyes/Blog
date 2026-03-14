import { database } from "../../../config/prisma"

//////////
// READ //
//////////

export const getDerechohacienciaRepository = async () => {
    try {
        return await database.derechohabienciaConfig.findMany({
            include: {
                links: {
                    orderBy: {
                        orderIndex: "asc"
                    }
                }
            }
        })
    } catch (error) {
        console.error("Error en getDerechohabienciaRepository", error)
        throw new Error("Error al obtener la derechohabiencia")
    }
}

////////////
// UPDATE //
////////////

interface PutDerechohabienciaLinkRepositoryProps {
    id: string;
    title: string;
    url: string;
}

export const putDerechohabienciaLinkRepository = async ({ id, title, url }: PutDerechohabienciaLinkRepositoryProps) => {
    try {
        return await database.derechohabienciaLink.update({
            where: { id },
            data: { title, url }
        })
    } catch (error) {
        console.error("Error en putDerechohabienciaLinkRepository", error)
        throw new Error("Error al actualizar el link de derechohabiencia")
    }
}

interface PutDerechohabienciaRepositoryProps {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

export const putDerechohabcienciaRepository = async ({ id, title, description, color, icon }: PutDerechohabienciaRepositoryProps) => {
    try {
        return await database.derechohabienciaConfig.update({
            where: { id },
            data: { title, description, color, icon },
            include: { links: { orderBy: { orderIndex: "asc" } } }
        })
    } catch (error) {
        console.error("Error en putDerechohabcienciaRepository", error)
        throw new Error("Error al actualizar la derechohabiencia")
    }
}