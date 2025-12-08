import { deletePageService, getAllPagesService, getPagesCountService, getPageService, getPagesService, publishPageService } from "@/services/pages.service"
import { RequestHandler, response } from "express"

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
        const { page, limit, search } = request.query
        const data = await getPagesService({
            page: Number(page ?? 1),
            limit: Number(limit ?? 10),
            search: String(search ?? "")
        })
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener lista de paginas"
            })
    }
}

export const getPagesCountController: RequestHandler = async (request, response) => {
    try {
        const { search } = request.query
        const data = await getPagesCountService(String(search ?? ""))
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener cantidad de paginas"
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

export const deletePageController: RequestHandler = async (request, response) => {
    try {
        const { id } = request.params
        await deletePageService(id)
        response.json('Ok')
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Eliminar página"
            })
    }
}

export const getAllPagesController: RequestHandler = async (request, response) => {
    try {
        const data = await getAllPagesService()
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener lista de todas las páginas"
            })
    }
}

