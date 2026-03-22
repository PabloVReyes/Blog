import { database } from "../../config/prisma"
import { logger } from "../../utils/logger"

export const getSettingsRepository = async () => {
    try {
        return await database.setting.findMany()
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getSettingsRepository",
                entity: "Settings"
            },
            "Error fetching settings"
        )
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
        logger.error(
            {
                error,
                operation: "updateSettingsRepository",
                entity: "Settings",
                payload: { name }
            },
            "Error updating settings"
        )
        throw new Error("Error al actualizar configuraciones")
    }
}