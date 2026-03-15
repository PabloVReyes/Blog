import * as repo from "../../modules/systems/system.repository";
import { getPagination } from "../../utils/pagination";
import * as scheme from "./search.scheme"

export const getSearchService = async (dto: scheme.getSearchScheme) => {
    const { page, search, limit } = dto
    const { take, skip } = getPagination()

    const [
        { data: systems, total: systemsTotal },
    ] = await Promise.all([
        repo.getSystemRepository({
            search,
            take: limit,
            skip,
        }),
    ]);

    const normalized = [
        ...systems.map((s: any) => ({
            id: s.id,
            name: s.name,
            acronym: s.acronym,
            description: s.description,
            icon: s.icon,
            color: s.color,
            url: s.url,
            type: "system",
            createdAt: s.createdAt,
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