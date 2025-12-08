import { deleteCarouselQuery, getAllCarouselCountQuery, getAllCarouselQuery, getCarouselQuery, postCarouselQuery, putCarouselQuery } from "@/helpers/carousel.query";

export const getCarouselService = async () => {
    const data = await getCarouselQuery()
    return data
}


export const getAllCarouselService = async (req: any) => {
    const { page, limit, search } = req.query

    const props = {
        skip: (limit * page - limit),
        take: Number(limit),
        search
    }

    const data = await getAllCarouselQuery(props)
    return data
}

export const getAllCarouselCountService = async (req: any) => {
    const data = await getAllCarouselCountQuery(req.query.search)
    return data
}

export const postCarouselService = async (req: any) => {
    // Archivo
    const file = req.file
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;

    const props = {
        title: req.body.title,
        description: req.body.description,
        image: imageUrl,
        url: req.body.url,
        is_visible: req.body.is_visible === "true" ? true : false
    }

    await postCarouselQuery(props)
    return ("ok")
}

export const putCarouselService = async (req: any) => {
    const id = req.params.id

    const props = {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        is_visible: req.body.is_visible === "true" ? true : false
    }

    const file = req.file
    if (file) {
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        props["image"] = imageUrl
    }

    await putCarouselQuery(id, props)
    return (true)
}

export const deleteCarouselService = async (req: any) => {
    const id = req.params.id
    await deleteCarouselQuery(id)
    return true
} 