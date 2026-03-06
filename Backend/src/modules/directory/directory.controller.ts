import { RequestHandler } from "express";
import * as scheme from "./directory.scheme"
import * as service from "./directory.service"

///
// CREATE //
//

export const postDirectoryController: RequestHandler = async (req, res) => {
    try {

        const body: scheme.PostDirectoryScheme = scheme.postDirectoryScheme.parse(req.body)
        const dto = { ...body }
        await service.postDirectoryService(dto)
        res.json({ success: true })
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(422).json({
                success: false,
                message: "Datos inválidos",
                errors: error.flatten(),
            });
        }

        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al crear descarga"
            })
    }
}

//////////
// READ //
//////////

export const getDirectoryController: RequestHandler = async (req, res) => {
    try {
        const dto = scheme.getDirectoryScheme.parse(req.query)
        const data = await service.getDirectoryService(dto)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener directorio telefonico"
            })
    }
}

export const getLevelsController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getLevelsService()
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener directorio telefonico"
            })
    }
}

/////
// UPDATE //
///

export const putDirectoryController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.putDirectoryParamsScheme.parse(req.params)
        const body: scheme.PutDirectoryScheme = scheme.putDirectoryScheme.parse(req.body)
        const dto = { ...body }
        const data = await service.putDirectoryService(params.id, dto)
        res.json(data)
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(422).json({
                success: false,
                message: "Datos inválidos",
                errors: error.flatten(),
            });
        }

        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al crear descarga"
            })
    }
}

////
// DELETE
//

export const deleteDirectoryController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.deleteDirectoryParamsScheme.parse(req.params)
        await service.deleteDirectoryService(params.id)
        res.json({ success: true })
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(422).json({
                success: false,
                message: "Datos inválidos",
                errors: error.flatten(),
            });
        }

        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al crear descarga"
            })
    }
}