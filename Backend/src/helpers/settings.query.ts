import { database } from "@/database/config"
import { response } from "express"

export const getSettingsQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.setting.findMany()
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
            await database.setting.upsert({
                where: { name },
                create: {
                    name,
                    value
                },
                update: {
                    value
                }
            })
            resolve(true)
        } catch (error) {
            console.log("Error updateSettingsQuery", error)
            reject(false)
        }
    })
}