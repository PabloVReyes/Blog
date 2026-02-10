import { deleteManualService, getAreasCountService, getAreasService, getAreaWithManualsService, getManualByTypeService, getManualService, getManualsTypeCountService, getManualsTypeService, getManualsWithAreaCountService, getManualsWithAreaService, putAreaService, putManualService, putManualTypeService } from "@/services/macroprocess.service";
import { RequestHandler } from "express";
import fs from "fs"

export const getAreaWithManualsController: RequestHandler = async (req, res) => {
    try {
        const data = await getAreaWithManualsService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al crear obtener area"
            })
    }
}

export const getManualByTypeController: RequestHandler = async (req, res) => {
    try {
        const data = await getManualByTypeService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener manual por tipo"
            })
    }
}

export const getManualsWithAreaController: RequestHandler = async (req, res) => {
    try {
        const data = await getManualsWithAreaService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener areas"
            })
    }
}

export const getManualsWithAreaCountController: RequestHandler = async (req, res) => {
    try {
        const data = await getManualsWithAreaCountService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener manuales"
            })
    }
}

export const putManualController: RequestHandler = async (req, res) => {
    try {
        const data = await putManualService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al actualizar manual"
            })
    }
}

export const getManualController: RequestHandler = async (req, res) => {
    try {
        const data = await getManualService(req)
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${data.fileName}"`
        );

        res.setHeader(
            "Access-Control-Expose-Headers",
            "Content-Disposition"
        );


        fs.createReadStream(data.filePath).pipe(res);
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al descargar el manual"
            })
    }
}

export const deleteManualController: RequestHandler = async (req, res) => {
    try {
        const data = await deleteManualService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error eliminar el manual"
            })
    }
}

export const getManualsTypeController: RequestHandler = async (req, res) => {
    try {
        const data = await getManualsTypeService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener tipos de manuales"
            })
    }
}

export const getManualsTypeCountController: RequestHandler = async (req, res) => {
    try {
        const data = await getManualsTypeCountService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al contar tipos de manuales"
            })
    }
}

export const putManualTypeController: RequestHandler = async (req, res) => {
    try {
        const data = await putManualTypeService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al actualizar tipo de manual"
            })
    }
}

export const getAreasController: RequestHandler = async (req, res) => {
    try {
        const data = await getAreasService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener areas"
            })
    }
}

export const getAreasCountController: RequestHandler = async (req, res) => {
    try {
        const data = await getAreasCountService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener la cantidad de areas"
            })
    }
}

export const putAreaController: RequestHandler = async (req, res) => {
    try {
        const data = await putAreaService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al actualizar area"
            })
    }
}