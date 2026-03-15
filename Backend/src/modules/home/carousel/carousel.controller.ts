import { RequestHandler } from "express"
import * as service from "./carousel.service"
import * as schema from "./carousel.schema"
import * as fs from "fs"

/////////////
// CREATED //
/////////////

export const postCarouselController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostCarouselSchema = schema.postCarouselSchema.parse(req.body)

        const files = req.files as {
            image?: Express.Multer.File[];
            file?: Express.Multer.File[];
        };
        const imageFile = files?.image?.[0];
        const contentFile = files?.file?.[0];

        const dto = { ...body, imageFile, contentFile }

        await service.postCarouselService(dto)

        res.json({ success: true })
    } catch (error: any) {
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
                msg: error.message || "Error al crear un carrusel"
            })
    }
}

//////////
// READ //
//////////

export const getCarouselController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getCarouselSchema.parse(req.query)
        const data = await service.getCarouselService(dto)
        res.json(data)
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        return res.status(400).json({
            message: "Error en la solicitud"
        })
    }
}


export const downloadCarouselFileController: RequestHandler = async (req, res) => {
    try {
        const params = schema.downloadCarouselFileSchema.parse(req.params)
        const data = await service.downloadCarouselFileService(params.id)

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${data.fileName}"`
        );

        res.setHeader(
            "Access-Control-Expose-Headers",
            "Content-Disposition"
        );


        fs.createReadStream(data.filePath).pipe(res);
    } catch (error: any) {
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
                msg: error.message || "Error al crear un carrusel"
            })
    }
}

////////////
// UPDATE //
////////////

export const putCarouselController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putCarouselParamsSchema.parse(req.params)

        const body: schema.PutCarouselSchema = schema.putCarouselSchema.parse(req.body)

        const files = req.files as {
            image?: Express.Multer.File[]
            file?: Express.Multer.File[]
        }

        const imageFile = files?.image?.[0]
        const contentFile = files?.file?.[0]

        const dto = { ...body, imageFile, contentFile }

        const data = await service.putCarouselService(params.id, dto)
        res.json(data)
    } catch (error: any) {
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
                msg: error.message || "Error al crear un carrusel"
            })
    }
}

////////////
// DELETE //
////////////

export const deleteCarouselController: RequestHandler = async (req, res) => {
    try {
        const params = schema.deleteCarouselParamsSchema.parse(req.params)
        await service.deleteCarouselService(params.id)
        res.json({ success: true })
    } catch (error: any) {
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
                msg: error.message || "Error al crear un carrusel"
            })
    }
}