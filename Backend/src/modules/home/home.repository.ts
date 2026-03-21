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
                },
                include: {
                    file: true
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
            derechohabiencia: {
                include: {
                    links: {
                        orderBy: {
                            orderIndex: "asc"
                        }
                    }
                }
            },
            alert: true,
            calendar: {
                include: {
                    file: true
                }
            }
        },
        orderBy: {
            orderIndex: "asc"
        }
    })
}