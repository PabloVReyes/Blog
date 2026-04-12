import { api } from "@/lib"

type CrudOptions = {
    enableAdd?: boolean
    enableUpdate?: boolean
    enableRemove?: boolean
}

export const createCrudApi = <
    T,
    CreateDTO = Partial<T>,
    UpdateDTO = Partial<T>,
    // SOLUCIÓN: Restringimos los filtros a tipos primitivos que pueden convertirse a string
    Filters extends Record<string, string | number | boolean | undefined> = {}
>(
    basePath: string,
    options: CrudOptions = {}
) => {
    const {
        enableAdd = true,
        enableUpdate = true,
        enableRemove = true
    } = options

    return {
        fetch: async (params?: Filters) => {
            const query = params
                ? new URLSearchParams(
                    Object.entries(params).reduce((acc, [k, v]) => {
                        // Ahora TypeScript sabe que 'v' no es 'any', sino un primitivo o undefined
                        if (v !== undefined && v !== "") {
                            acc[k] = String(v)
                        }
                        return acc
                    }, {} as Record<string, string>)
                ).toString()
                : ""

            const { data } = await api.get<{ data: T[] }>(`${basePath}${query ? `?${query}` : ""}`)
            return data
        },

        ...(enableAdd && {
            add: async (dto: CreateDTO) => {
                const { data } = await api.post(basePath, dto)
                return data
            }
        }),

        ...(enableUpdate && {
            update: async (id: string | number, dto: UpdateDTO) => {
                const { data } = await api.put(`${basePath}/${id}`, dto)
                return data
            }
        }),

        ...(enableRemove && {
            remove: async (id: string | number) => {
                const { data } = await api.delete(`${basePath}/${id}`)
                return data
            }
        })
    }
}