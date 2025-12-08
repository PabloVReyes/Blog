import { deleteFileService, getFilesCountService, getFilesService } from "@/services/files.service";
import { RequestHandler } from "express";

export const getFilesController: RequestHandler = async (req, res) => {
    try {
        const files = await getFilesService(req);
        res.json(files);
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Obtener lista de archivos"
            })
    }
}

export const getFilesCountController: RequestHandler = async(req, res) => {
    try {
        const data = await getFilesCountService(req)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Obtener cantidad de archivos"
            })
    }
}

export const deleteFileController: RequestHandler = async(req, res) => {
    try {
        await deleteFileService(req)
        res.json("Ok")
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Eliminar archivo"
            })
    }
}