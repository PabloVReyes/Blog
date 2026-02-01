import { getSearchService } from "@/services/search.service"
import { RequestHandler } from "express"

export const getSearchContoller: RequestHandler = async (req, res) => {
    try {
        const data = await getSearchService(req)
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al realizar busquedas"
            })
    }
}