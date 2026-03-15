import * as service from "./search.service"
import { RequestHandler } from "express"
import * as scheme from "./search.scheme"

export const getSearchContoller: RequestHandler = async (req, res) => {
    try {
        const dto = scheme.getSearchScheme.parse(req.query)
        const data = await service.getSearchService(dto)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al realizar busquedas"
            })
    }
}