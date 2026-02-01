import { getSystemsQuery } from "@/helpers/systems.query"

export const getSearchService = async (req: any) => {
    const { page, limit, search } = req.query
    const props = {
        skip: undefined,
        take: undefined,
        search: limit !== 'undefined' ? search : undefined
    }

    const [systems]: any = await Promise.all([
        getSystemsQuery(props),
    ]);

    const combined = [
        ...systems.map(s => ({ ...s, type: "system" })),
    ];

    const start = (page - 1) * limit;
    const results = combined.slice(start, start + limit);

    return results
}