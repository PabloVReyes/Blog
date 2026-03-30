import * as repo from "./search.repository";
import { getPagination } from "../../utils/pagination";
import * as schema from "./search.schema"
import * as type from "./search.types"

export const getSearchService = async (dto: schema.getSearchSchema) => {
    const { page, search, limit } = dto
    const { take, skip } = getPagination(page, limit)

    const [
        { data: systems, total: systemsTotal },
    ] = await Promise.all([
        repo.getSearchSystemRepository({
            search,
            take,
            skip,
        }),
    ]);

    const normalized = [
        ...systems.map((s: type.SearchResponse) => ({
            id: s.id,
            name: s.name,
            acronym: s.acronym,
            description: s.description,
            icon: s.icon,
            color: s.color,
            url: s.url,
            type: "system",
            createdAt: s.createdAt,
            file: s.file ? {
                id: s.file.id,
            } : null,
        })),
    ];

    normalized.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
    );

    return {
        data: normalized,
        total: systemsTotal,
    };
};