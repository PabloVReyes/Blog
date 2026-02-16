import { deleteSystemService, postSystemService, putSystemService } from "@/services/systems.service";
import { RequestHandler } from "express";

export const postSystemController: RequestHandler = async (req, res) => {
    try {
        await postSystemService(req)
        res.json("Ok")
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al agregar sistema"
            })
    }
}


export const putSystemController: RequestHandler = async (req, res) => {
    try {
        const data = await putSystemService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al actualizar sistema"
            })
    }
}

export const deleteSystemController: RequestHandler = async (req, res) => {
    try {
        await deleteSystemService(req)
        res.json("Ok")
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al eliminar sistema"
            })
    }
}