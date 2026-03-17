import * as repo from "./derechohabiencia.repository"
import { PutDerechohabienciaBody, PutDerechohabienciaParams } from "./derechohabiencia.schema"

//////////
// READ //
//////////

export const getDerechohabienciaService = async () => {
    const data = await repo.getDerechohacienciaRepository()
    return {
        data,
        meta: {
            total: 1
        }
    }
}

////////////
// UPDATE //
////////////



export const putDerechohabienciaService = async (id: string, dto: PutDerechohabienciaBody) => {
    const { links, title, description, color, icon } = dto

    for (const link of links) {
        const props = {
            id: link.id,
            url: link.url,
            title: link.title
        }
        await repo.putDerechohabienciaLinkRepository(props)
    }

    const props = {
        id,
        title,
        description,
        color,
        icon
    }

    const data = await repo.putDerechohabcienciaRepository(props)

    return data
}