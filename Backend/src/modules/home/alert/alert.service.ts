import * as repo from "./alert.repository"
import { PutAlertSchema } from "./alert.schema"

export const getAlertService = async () => {
    const data = await repo.getAlertRepository()
    return {
        data,
        meta: {
            total: 1,
        }
    }
}

export const putAlertService = async (dto: PutAlertSchema) => {
    const data = await repo.putAlertRepository(dto)
    return data
}