import * as schema from "./certification.schema"
import * as repo from "./certification.repository"
import * as types from "./certification.types"
import { sanitizeFileName } from "../../utils/file"
import { buildPaginationMeta, getPagination } from "../../utils/pagination"
import path from "path"
import { uploadsRoot } from "./path"
import { logger } from "../../utils/logger"

////////////
// CREATE //
////////////

export const postCertificationService = async (dto: types.CertificationCreateDto) => {
    const { name, description, isNew, section, file } = dto

    if (!file) {
        throw new Error("El archivo es requerido")
    }

    return await repo.postCertificationRepository({
        name,
        description: description ?? null,
        isNew,
        sectionId: section,
        file:
            file
                ? {
                    name: sanitizeFileName(file.originalname),
                    path: file.filename,
                    size: file.size,
                    mimeType: file.mimetype
                }
                : null
    })
}

export const postSectionService = async (dto: schema.PostSectionSchema) => {
    const { name } = dto
    return await repo.postSectionRepository(name)
}

//////////
// READ //
//////////

export const getSectionsWithCertificationsService = async (dto: schema.GetSectionWithCertificationsSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getSectionsWithCertificationsRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getSectionsService = async () => {
    const { data, total } = await repo.getSectionsRepository()

    return {
        data,
        meta: buildPaginationMeta(total)
    }
}

export const getCertificationsService = async (dto: schema.GetCertificationsSchema) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getCertificationsRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

////////////
// UPDATE //
////////////

export const putCertificationService = async (id: number, dto: types.CertificationUpdateDto) => {
    const { name, description, isNew, section, file } = dto

    const existingItem = await repo.getCertificationByIdRepository(id)

    if (!existingItem) {
        throw new Error("El sistema no existe")
    }

    const props: any = {
        id,
        name,
        description: description ?? null,
        isNew,
        sectionId: section,
        file:
            file
                ? {
                    name: sanitizeFileName(file.originalname),
                    path: file.filename,
                    size: file.size,
                    mimeType: file.mimetype
                }
                : null
    }

    return await repo.putCertificationRepository(props)
}

////////////
// DELETE //
////////////

export const deleteCertificationService = async (id: number) => {
    const Certification = await repo.getCertificationByIdRepository(id)

    if (!Certification) {
        throw new Error("Descarga no encontrada")
    }

    await repo.deleteCertificationRepository(id)
}

// 169 lineas -> 152 lineas -> 133 lineas