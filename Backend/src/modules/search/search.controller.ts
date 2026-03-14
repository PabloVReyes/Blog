import * as service from "./search.service"
import { RequestHandler } from "express"

export const getSearchContoller: RequestHandler = async (req, res) => {
    try {
        const data = await service.getSearchService(req)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al realizar busquedas"
            })
    }
}