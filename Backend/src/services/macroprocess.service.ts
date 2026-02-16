import { deleteManualQuery, getAreasCountQuery, getAreasQuery, getAreaWithManualsQuery, getManualByIdQuery, getManualByTypeQuery, getManualQuery, getManualsTypeCountQuery, getManualsTypeQuery, getManualsWithAreaCountQuery, getManualsWithAreaQuery, putAreaQuery, putManualQuery, putManualTypeQuery } from "@/helpers/macroprocess.query";
import { sanitizeFileName } from "@/routes/macroprocess.routes";

export const getAreaWithManualsService = async (req: any) => {
    const { id } = req.params;
    const data = getAreaWithManualsQuery(id)
    return data
}

export const getManualsWithAreaService = async (req: any) => {
    const { page, limit, search } = req.query

    const props = {
        skip: (limit * page - limit),
        take: Number(limit),
        search
    }

    const data = getManualsWithAreaQuery(props)

    return data
}

export const getManualsWithAreaCountService = async (req: any) => {
    const { search } = req.query

    const data = getManualsWithAreaCountQuery(search)

    return data
}

export const putManualService = async (req: any) => {
    const { id } = req.params
    const file = req.file


    if (!file) {
        throw new Error("Archivo requerido")
    }

    const manual: any = await getManualByIdQuery(id)

    if (manual.storedName) {
        try {
            if (manual.filePath) {
                const fs = await import("fs/promises");
                await fs.unlink(manual.filePath).catch(() => { });
            }
        } catch (error) {
            console.error("Error eliminando archivo anterior:", error);
        }
    }

    const props: any = {
        id,
        fileName: sanitizeFileName(file.originalname),
        storedName: file.filename,
        filePath: file.path,
        fileSize: file.size,
        mimeType: file.mimetype
    }

    const data = await putManualQuery(props)

    return data
}


export const getManualService = async (req: any) => {
    const { id } = req.params
    const data: any = await getManualQuery(id)

    if (!data || !data.filePath) {
        throw new Error("Archivo no encontrado")
    }

    const props = {
        filePath: data.filePath,
        fileName: data.fileName
    }

    return props
}

export const getManualByTypeService = async (req: any) => {
    const { type } = req.params

    const data = await getManualByTypeQuery(type)

    return data
}

export const deleteManualService = async (req: any) => {
    const { id } = req.params

    const manual: any = await getManualByIdQuery(id)

    if (!manual) {
        throw new Error("Manual no encontrado")
    }

    if (manual.filePath) {
        const fs = await import("fs/promises");
        await fs.unlink(manual.filePath).catch(() => { });
    }

    const data = await deleteManualQuery(id)

    return data
}

export const getManualsTypeService = async (req: any) => {
    const { page, limit, search } = req.query

    const props = {
        skip: (limit * page - limit),
        take: Number(limit),
        search
    }

    const data = await getManualsTypeQuery(props)

    return data
}

export const getManualsTypeCountService = async (req: any) => {
    const { search } = req.query

    const data = await getManualsTypeCountQuery(search)

    return data
}

export const putManualTypeService = async (req: any) => {
    const { id } = req.params
    const { code, name, color } = req.body

    const props = {
        id,
        code,
        name,
        color
    }

    const data = putManualTypeQuery(props)
    return data
}

export const getAreasService = async (req: any) => {
    const { page, limit, search } = req.query

    const props = {
        skip: (limit * page - limit),
        take: Number(limit),
        search
    }

    const data = await getAreasQuery(props)

    return data
}

export const getAreasCountService = async (req: any) => {
    const { search } = req.query

    const data = await getAreasCountQuery(search)

    return data
}

export const putAreaService = async (req: any) => {
    const { id } = req.params
    const { name } = req.body

    const props = {
        id,
        name,
    }


    const data = await putAreaQuery(props)

    return data
}