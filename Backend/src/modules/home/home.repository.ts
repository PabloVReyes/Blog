import { database } from "../../config/prisma"

export const getHomeRepository = async () => {
    return await database.homeSection.findMany({
        include: {
            carouselItems: {
                where: {
                    isActive: true,
                },
                orderBy: {
                    orderIndex: "desc"
                }
            },
            accessCards: {
                where: {
                    isActive: true,
                },
                orderBy: {
                    orderIndex: "asc"
                }
            },
            derechoambiencia: {
                include: {
                    links: {
                        orderBy: {
                            orderIndex: "asc"
                        }
                    }
                }
            },
            alert: true,
            calendar: true
        },
        orderBy: {
            orderIndex: "asc"
        }
    })
}