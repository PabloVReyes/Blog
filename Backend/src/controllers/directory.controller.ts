import { getDirectoryService } from "@/services/directory.service";
import { RequestHandler } from "express";

export const getDirectoryController: RequestHandler = async(req, res) => {
    try {
        const data = await getDirectoryService(req)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener directorio telefonico"
            })
    }
}