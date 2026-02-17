import { getSystemRepository } from "@/modules/systems/system.repository";

export const getSearchService = async (req: any) => {
    const { page, limit, search } = req.query

    const props = {
        skip: undefined,
        take: undefined,
        search: limit !== 'undefined' ? search : undefined
    }

    const [{ data: systems },]: any = await Promise.all([
        getSystemRepository(props),
    ]);

    const combined = [
        ...systems.map(s => ({ ...s, typeSearch: "system" })),
    ];

    const start = (page - 1) * limit;
    const results = combined.slice(start, start + limit);

    return results
}