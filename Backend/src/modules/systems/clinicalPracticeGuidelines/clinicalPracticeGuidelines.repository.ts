import { database } from "@/config/prisma"
import { PaginationProps } from "@/types/pagination";

////////////
// CREATE //
////////////

interface PostClinicalPracticeGuidelinesReporisoryProps {
    code: string;
    title: string;
    category: string;
    fileNameER: string;
    filePathER: string;
    fileSizeER: number;
    mimeTypeER: string;
    fileNameRR: string;
    filePathRR: string;
    fileSizeRR: number;
    mimeTypeRR: string;
}

export const postClinicalPracticeGuidelinesReporisory = async ({
    code,
    title,
    category,
    fileNameER,
    filePathER,
    fileSizeER,
    mimeTypeER,
    fileNameRR,
    filePathRR,
    fileSizeRR,
    mimeTypeRR,
}: PostClinicalPracticeGuidelinesReporisoryProps) => {
    try {
        return await database.clinicalPracticeGuidelines.create({
            data: {
                code,
                title,
                categoryId: category,

                // ER
                fileNameER,
                filePathER,
                fileSizeER,
                mimeTypeER,

                // RR
                fileNameRR,
                filePathRR,
                fileSizeRR,
                mimeTypeRR
            }
        })
    } catch (error) {
        console.error("Error en postClinicalPracticeGuidelinesReporisory")
        throw new Error("Error al crear la guia")
    }
}

export const postCategoryRepository = async (name: string) => {
    try {
        return await database.category.create({
            data: {
                name
            }
        })
    } catch (error) {
        console.error("Error en postCategoryRepository")
        throw new Error("Error al crear nueva categoria")
    }
}

//////////
// READ //
//////////

interface GetClinicalPracticeGuidelinesRepositoryProps extends PaginationProps {
    categoryId: string;
}

export const getClinicalPracticeGuidelinesRepository = async ({ search, take, skip, categoryId }: GetClinicalPracticeGuidelinesRepositoryProps) => {
    try {
        const where = {
            ...(categoryId && {
                categoryId
            }),
            ...(search && {
                OR: [
                    { title: { contains: search } },
                    { code: { contains: search } },
                    {
                        category: {
                            name: { contains: search }
                        }
                    },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.clinicalPracticeGuidelines.findMany({
                where,
                orderBy: {
                    id: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    category: true
                }
            }),
            database.clinicalPracticeGuidelines.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getClinicalPracticeGuidelinesRepository")
        throw new Error("Error al obtener guias")
    }
}

export const getCategoryRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.category.findMany({
                orderBy: { id: "asc" }
            }),
            database.category.count(),
        ])

        return { data, total }
    } catch (error) {
        console.error("error en postClinicalPracticeGuidelinesController")
        throw new Error("Error al obtener categorias")
    }
}

export const getClinicalPracticeGuidelineByIdRepository = async (id: string) => {
    try {
        return await database.clinicalPracticeGuidelines.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getClinicalPracticeGuidelineByIdRepository")
        throw new Error("Error al obtener la guia")
    }
}

////////////
// UPDATE //
////////////

interface PutClinicalPracticeGuidelinesReporisoryProps extends PostClinicalPracticeGuidelinesReporisoryProps {
    id: string;
}

export const putClinicalPracticeGuidelinesReporisory = async ({
    id,
    code,
    title,
    category,
    fileNameER,
    filePathER,
    fileSizeER,
    mimeTypeER,
    fileNameRR,
    filePathRR,
    fileSizeRR,
    mimeTypeRR,
}: PutClinicalPracticeGuidelinesReporisoryProps) => {
    try {
        return await database.clinicalPracticeGuidelines.update({
            where: { id },
            data: {
                code,
                title,
                categoryId: category,
                fileNameER,
                filePathER,
                fileSizeER,
                mimeTypeER,
                fileNameRR,
                filePathRR,
                fileSizeRR,
                mimeTypeRR,
            },
            include: {
                category: true
            }
        })
    } catch (error) {
        console.error("error en putClinicalPracticeGuidelinesReporisory")
        throw new Error("Error al actualizar la guia")
    }
}

////////////
// DELETE //
////////////

export const deleteClinicalPracticeGuidelinesRepository = async (id: string) => {
    try {
        return await database.clinicalPracticeGuidelines.delete({ where: { id } })
    } catch (error) {
        console.error("Error en deleteClinicalPracticeGuidelinesReporisory", error)
        throw new Error("Error al eliminar guía")
    }
}