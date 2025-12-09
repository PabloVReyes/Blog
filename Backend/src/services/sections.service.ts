import { getSectionsQuery, putSectionQuery } from "@/helpers/sections.query"

export const getSectionsService = async () => {
    const data = await getSectionsQuery()
    return data
}

export const putSectionService = async (req: any) => {
    const id = Number(req.params.id)
    const { title, content, url, image } = req.body

    const props = {
        title: title,
        content: content,
        url: url
    }

    if (image === "true") {
        const file = req.file
        if (file) {
            const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
            props["image"] = imageUrl
        }
    } else {
            props["image"] = null
    }


    await putSectionQuery(id, props)

    return true;
}