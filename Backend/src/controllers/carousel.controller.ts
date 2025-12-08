import { deleteCarouselService, getAllCarouselCountService, getAllCarouselService, getCarouselService, postCarouselService, putCarouselService } from "@/services/carousel.service"
import { RequestHandler } from "express"

export const postCarouselController: RequestHandler = async(req, res) => {
    try {
        await postCarouselService(req)
        res.json("Ok")
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Agregar elemento al carousel"
            })
    }
}

export const getAllCarouselCountContoller: RequestHandler = async(req, res) => {
    try {
        const data = await getAllCarouselCountService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error || "Conteo de items"
            })
    }
}

export const getAllCarouselContoller: RequestHandler = async(req, res) => {
    try {
        const data = await getAllCarouselService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Obtener items del carousel"
            })
    }
}

export const getCarouselController: RequestHandler = async(req, res) => {
    try {
        const data = await getCarouselService()
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Obtener Slices de carousel"
            })
    }
}

export const putCarouselController: RequestHandler = async(req, res) => {
    try {
        await putCarouselService(req)
        res.json("Ok")
    } catch (error) {
        res.status(500)
            .send({
                msg: error || "Actualizar item"
            })
    }
}

export const deleteCarouselController: RequestHandler = async(req, res) => {
    try {
        await deleteCarouselService(req)
        res.json("Ok")
    } catch (error) {
        res.status(500)
            .send({
                msg: error || "Deliminar item"
            })
    }
}