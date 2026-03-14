import { getSystemRepository } from "../../modules/systems/system.repository";

export const getSearchService = async (req: any) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const [
        { data: systems, total: systemsTotal },
    ] = await Promise.all([
        getSystemRepository({
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