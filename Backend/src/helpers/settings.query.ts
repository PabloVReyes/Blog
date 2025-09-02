import { database } from "@/database/config"
import { response } from "express"

export const getSettingsQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.settings.findMany()
            resolve(data)
        } catch {
            reject([])
        }
    })
}

interface Props {
    name: string
    value: string
}

export const updateSettingsQuery = ({ name, value }: Props) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.settings.update({
                where: { name },
                data: {
                    value: value
                }
            })
            resolve(true)
        } catch {
            reject(false)
        }
    })
}