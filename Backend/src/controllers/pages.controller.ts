import { deletePageService, getAllPagesUrlService, getPagesCountService, getPageService, getPagesService, publishPageService, uploadPageImageService } from "@/services/pages.service"
import { RequestHandler, response } from "express"

////////////
// Create //
////////////

// Publicar pagina
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

// Subir imagen
export const uploadPageImageController: RequestHandler = async (req, res) => {
    try {
        const data = await uploadPageImageService(req);
        res.json(data);
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Subir imagen de página"
            })
    }
}


////////////
//  Read  //
////////////

// Obtener paginas
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

// Numero total de paginas
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

// Informacion de la pagina
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

// Todas las paginas (URL)
export const getAllPagesUrlController: RequestHandler = async (request, response) => {
    try {
        const data = await getAllPagesUrlService()
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener lista de todas las páginas"
            })
    }
}


////////////
// Update //
////////////

////////////
// Delete //
////////////

// Eliminar pagina
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

