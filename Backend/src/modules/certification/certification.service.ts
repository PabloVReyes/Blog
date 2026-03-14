import * as scheme from "./certification.scheme"
import * as repo from "./certification.repository"
import * as types from "./certification.types"
import { sanitizeFileName } from "../../utils/file"
import { getPagination } from "../../utils/pagination"
import * as path from "path"
import { uploadsRoot } from "./path"

//
//
//

export const postCertificationService = async (dto: types.CertificationCreateDto) => {
    const { name, description, isNew, section, file } = dto

    return await repo.postCertificationRepository({
        name,
        description: description ?? null,
        isNew,
        sectionId: section,
        fileName: file?.originalname ? sanitizeFileName(file?.originalname) : null,
        filePath: file?.filename ?? null,
        fileSize: file?.size ?? null,
        mimeType: file?.mimetype ?? null,
    })
}

export const postSectionService = async (dto: scheme.PostSectionScheme) => {
    const { name } = dto
    return await repo.postSectionRepository(name)
}

////
// READ /
////

export const getSectionsWithCertificationsService = async (dto: scheme.GetSectionWithCertificationsScheme) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getSectionsWithCertificationsRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: {
            total,
            page: page ?? 1,
            limit: limit ?? total,
            totalPages: limit ? Math.ceil(total / limit) : 1,
            firstItem: (page && limit) && limit * (page - 1) + 1,
            lastItem: (page && limit) && Math.min(total, limit * page)
        }
    }
}

export const getSectionsService = async () => {
    const { data, total } = await repo.getSectionsRepository()

    return {
        data,
        meta: {
            total
        }
    }
}

export const getCertificationsService = async (dto: scheme.GetCertificationsScheme) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getCertificationsRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: {
            total,
            page: page ?? 1,
            limit: limit ?? total,
            totalPages: limit ? Math.ceil(total / limit) : 1,
            firstItem: (page && limit) && limit * (page - 1) + 1,
            lastItem: (page && limit) && Math.min(total, limit * page)
        }
    }
}

export const downloadCertificationFileService = async (id: number) => {
    const Certification = await repo.getCertificationByIdRepository(id)

    if (!Certification || !Certification.filePath) {
        throw new Error("Norma no encontrada")
    }

    const obsolutePath = path.join(uploadsRoot, Certification.filePath)

    return {
        filePath: obsolutePath,
        fileName: Certification.fileName,
        mimeType: Certification.mimeType
    }
}

//
// UPDATE
//

export const putCertificationService = async (id: number, dto: types.CertificationUpdateDto) => {
    const { name, description, isNew, section, file } = dto

    const standar: any = await repo.getCertificationByIdRepository(id)

    const props: any = {
        id,
        name,
        description: description ?? null,
        isNew,
        sectionId: section
    }

    if (file) {
        if (standar.filePath) {
            try {
                if (standar.filePath) {
                    const obsolutePath = path.join(uploadsRoot, standar.filePath)
                    const fs = await import("fs/promises");
                    await fs.unlink(obsolutePath).catch(() => { });
                }


            } catch (error) {
                console.error("Error eliminando archivo anterior:", error);
            }
        }

        props.fileName = sanitizeFileName(file.originalname);
        props.filePath = file.filename;
        props.fileSize = file.size;
        props.mimeType = file.mimetype;
    }

    return await repo.putCertificationRepository(props)
}

//
// DELETE 
//

export const deleteCertificationService = async (id: number) => {
    const Certification = await repo.getCertificationByIdRepository(id)

    if (!Certification) {
        throw new Error("Descarga no encontrada")
    }

    if (Certification.filePath) {
        const obsolutePath = path.join(uploadsRoot, Certification.filePath)
        const fs = await import("fs/promises");
        await fs.unlink(obsolutePath).catch(() => { });
    }

    await repo.deleteCertificationRepository(id)
}