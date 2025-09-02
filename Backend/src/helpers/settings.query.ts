import { database } from "@/database/config"
import { response } from "express"

export const getSettingsQuery = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await database.settings.findMany()
            resolve(data)
        } catch {
            reject([])
        }
    })
}