import { database } from "@/database/config"

interface getAllCarouselQueryProps {
    skip: number;
    take: number;
    search: string;
}

export const getAllCarouselQuery = ({ skip, take, search }: getAllCarouselQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {}

            if (search && search.trim() != "") {
                whereCondition = {
                    OR: [
                        { title: { contains: search } },
                        { description: { contains: search } },
                        { url: { contains: search } }
                    ]
                }
            }

            const data = await database.carousel.findMany({
                where: whereCondition,
                orderBy: {
                    createdAt: "desc"
                },
                skip,
                take
            })
            resolve(data)
        } catch (error) {
            console.error("Error en getAllCarouselQuery", error)
            reject([])
        }
    })
}

export const getAllCarouselCountQuery = (search: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {}

            if (search && search.trim() != "") {
                whereCondition = {
                    OR: [
                        { title: { contains: search } },
                        { description: { contains: search } },
                        { url: { contains: search } }
                    ]
                }
            }

            const data = await database.carousel.count({
                where: whereCondition
            })
            resolve(data)
        } catch (error) {
            console.error("Error en getAllCarouselCountQuery", error)
            reject(0)
        }
    })
}

export const getCarouselQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.carousel.findMany({
                where: {
                    is_visible: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
            resolve(data)
        } catch (error) {
            console.error("Error en getCarouselQuery", error)
            reject([])
        }
    })
}

interface PostCarouselQueryProps {
    title: string;
    description: string;
    image: string;
    url: string;
    is_visible: boolean,
}

export const postCarouselQuery = (props: PostCarouselQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.carousel.create({
                data: {
                    ...props
                }
            })

            resolve(true)
        } catch (error) {
            console.error("Error en postCarouselQuery", error)
            reject(false)
        }
    })
}

interface PutCarouselQueryProps {
    title: string;
    description: string;
    image?: string;
    url: string;
    is_visible: boolean,
}

export const putCarouselQuery = (id: string, props: PutCarouselQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.carousel.update({
                where: { id },
                data: {
                    ...props
                }
            })
            resolve(true)
        } catch (error) {
            console.error("Error en putCarouselQuery", error)
            reject(false)
        }
    })
}

export const deleteCarouselQuery = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.carousel.delete({
                where: {
                    id
                }
            })
            resolve(true)
        } catch (error) {
            console.error("Error en deleteCarouselQuery", error)
            reject(false)
        }
    })
}