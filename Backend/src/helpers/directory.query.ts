import { database } from "@/config/prisma"

interface Props {
    skip: number;
    take: number;
    search: string;
}

export const getDirectoryQuery = ({ skip, take, search }: Props) => {
    return new Promise(async (resolve, reject) => {
        try {
            let wheteCondition = {}

            if (search && search.trim() != "") {
                wheteCondition = {
                    OR: [
                        { phone: { contains: search } },
                        { boss: { contains: search } },
                        { secretary: { contains: search } },
                        { name: { contains: search } },
                    ]
                }
            }

            const data = await database.ditectory.findMany({
                where: wheteCondition,
                orderBy: {
                    phone: "asc"
                },
                skip,
                take
            })

            resolve(data)
        } catch (error) {
            console.error("Error en getDirectoryQuery", error)
            reject([])
        }
    })
}