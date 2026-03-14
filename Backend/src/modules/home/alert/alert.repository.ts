import { database } from "../../../config/prisma"
import { PutAlertProps } from "./alert.types"

export const getAlertRepository = async () => {
    return await database.alertMessage.findMany()
}

export const putAlertRepository = async ({ id, icon, isActive, title, description, author, color }: PutAlertProps) => {
    return await database.alertMessage.update({
        where: { id },
        data: { icon, isActive, title, description, author, color }
    })
}