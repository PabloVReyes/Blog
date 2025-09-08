import { getPageService, getPagesService, publishPageService } from "@/services/pages.service"
import { RequestHandler } from "express"

export const publishPageController: RequestHandler = async (request, response) => {
    try {
        const body = request.body
        await publishPageService(body)
        response.json('Ok')
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Guardar pagina"
            })
    }
}

export const getPagesController: RequestHandler = async (request, response) => {
    try {
        const data = await getPagesService()
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener lista de paginas"
            })
    }
}

export const getPageController: RequestHandler = async (request, response) => {
    try {
        const { slug } = request.params
        const data = await getPageService(slug)
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener página"
            })
    }
}