import { getPagination } from "@/utils/pagination";
import * as repo from "./codes.repository"
import { GetCodesSchema } from "./codes.schema";

//////////
// READ //
//////////

interface GetCodesServiceProps extends GetCodesSchema {
    categoryId?: string;
}

export const getCodesService = async (dto: GetCodesServiceProps) => {
    const { page, limit, search, categoryId } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCodesRepository({
        skip,
        take,
        search,
        categoryId
    })

    return {
        data,
        meta: {
            total,
            page: page ?? 1,
            limit: limit ?? total,
            totalPages: limit ? Math.ceil(total / limit) : 1,
            firstItem: page && limit * (page - 1) + 1,
            lastItem: page && Math.min(total, limit * page)
        }
    }
}

export const getCategorysService = async () => {
    const { data, total } = await repo.getCategoryRepository()
    
    return {
        data,
        meta: {
            total
        }
    }
}