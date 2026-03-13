import { database } from "@/config/prisma"

export const getSettingsRepository = async () => {
    try {
        return await database.setting.findMany()
    } catch (error) {
        console.error("Error en getSettingsRepository")
        throw new Error("Error al obtener actualización")
    }
}

interface Props {
    name: string
    value: string
}

export const updateSettingsRepository = async ({ name, value }: Props) => {
    try {
        return await database.setting.upsert({
            where: { name },
            create: {
                name,
                value
            },
            update: {
                value
            }
        })
    } catch (error) {
        console.error("Error updateSettingsQuery", error)
        throw new Error("Error al actualizar configuraciones")
    }
}