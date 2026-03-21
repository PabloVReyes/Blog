import { create } from "zustand"
import { registerStoreReset } from "./storeResetRegistry"

interface Meta {
    total: number
    totalPages: number
    firstItem: number
    lastItem: number
}

interface PageCache<T> {
    items: T[]
    meta: Meta
    timestamp: number
}

export interface CrudApi<T, Id, CreateDTO, UpdateDTO> {
    fetch?: (params: unknown) => Promise<{ data: T[]; meta: Meta }>

    add?: (dto: CreateDTO) => Promise<void>
    update?: (id: Id, dto: UpdateDTO) => Promise<T>
    remove?: (id: Id) => Promise<void>
}

interface DataState<T> {
    items: T[]
    page: number
    limit: number

    totalItems: number
    totalPages: number
    firstItem: number
    lastItem: number

    search: string
    isLoading: boolean

    cache: Record<string, PageCache<T>>
}

interface Actions<_T, Id, CreateDTO, UpdateDTO> {
    setSearch: (search: string) => Promise<void>
    setPage: (page: number) => Promise<void>
    setLimit: (limit: number) => Promise<void>

    fetch?: () => Promise<void>
    add?: (dto: CreateDTO) => Promise<void>
    update?: (id: Id, dto: UpdateDTO) => Promise<void>
    remove?: (id: Id) => Promise<void>

    reset: () => void
}

export type CrudStore<T, Id, CreateDTO, UpdateDTO> =
    DataState<T> & Actions<T, Id, CreateDTO, UpdateDTO>

function getInitialState<T>(): DataState<T> {
    return {
        items: [],
        page: 1,
        limit: 10,

        totalItems: 0,
        totalPages: 0,
        firstItem: 0,
        lastItem: 0,

        search: "",
        isLoading: false,

        cache: {}
    }
}

export function createCrudStore<
    T extends { id: Id },
    Id = number,
    CreateDTO = Partial<T>,
    UpdateDTO = Partial<T>
>(
    api: CrudApi<T, Id, CreateDTO, UpdateDTO>,
    cacheTTL = 60000
) {

    let requestId = 0

    const store = create<CrudStore<T, Id, CreateDTO, UpdateDTO>>((set, get) => {

        const baseState = getInitialState<T>()

        const actions: Actions<T, Id, CreateDTO, UpdateDTO> = {

            reset() {
                set(() => getInitialState<T>())
            },

            async setSearch(search) {

                set(state => ({
                    ...state,
                    search,
                    page: 1,
                    cache: {}
                }))

                if (api.fetch) {
                    await actions.fetch?.()
                }
            },

            async setPage(page) {
                const { limit, search, cache } = get()
                const key = `${page}-${limit}-${search}`
                const cached = cache[key]
                if (cached && Date.now() - cached.timestamp < cacheTTL) {
                    set(state => ({
                        ...state,
                        page,
                        items: cached.items,
                        totalItems: cached.meta.total,
                        totalPages: cached.meta.totalPages,
                        firstItem: cached.meta.firstItem,
                        lastItem: cached.meta.lastItem
                    }))
                    return
                }
                set(state => ({ ...state, page }))
                if (api.fetch) {
                    await actions.fetch?.()
                }
            },

            async setLimit(limit) {

                set(state => ({
                    ...state,
                    limit,
                    page: 1,
                    cache: {}
                }))

                if (api.fetch) {
                    await actions.fetch?.()
                }
            }
        }

        if (api.fetch) {

            actions.fetch = async () => {
                const currentRequest = ++requestId
                const { page, limit, search, cache } = get()
                const key = `${page}-${limit}-${search}`
                const cached = cache[key]
                if (cached && Date.now() - cached.timestamp < cacheTTL) {
                    return
                }
                set(state => ({ ...state, isLoading: true }))

                try {

                    const { data, meta } = await api.fetch!({
                        page,
                        limit,
                        search
                    })

                    if (currentRequest !== requestId) return

                    set(state => ({
                        ...state,

                        items: data,

                        totalItems: meta.total,
                        totalPages: meta.totalPages,
                        firstItem: meta.firstItem,
                        lastItem: meta.lastItem,

                        cache: {
                            ...state.cache,
                            [key]: {
                                items: data,
                                meta,
                                timestamp: Date.now()
                            }
                        }
                    }))

                } finally {

                    if (currentRequest === requestId) {
                        set(state => ({ ...state, isLoading: false }))
                    }

                }
            }
        }

        if (api.add) {

            actions.add = async (dto) => {

                await api.add!(dto)

                set(state => ({
                    ...state,
                    page: 1,
                    cache: {}
                }))

                await actions.fetch?.()
            }
        }

        if (api.update) {

            actions.update = async (id, dto) => {

                const updated = await api.update!(id, dto)

                set(state => ({
                    ...state,
                    items: state.items.map(item =>
                        String(item.id) === String(id)
                            ? { ...item, ...updated }
                            : item
                    )
                }))
            }
        }

        if (api.remove) {

            actions.remove = async (id) => {

                await api.remove!(id)

                set(state => ({
                    ...state,
                    page: 1,
                    cache: {}
                }))

                await actions.fetch?.()
            }
        }

        const storeState = {
            ...baseState,
            ...actions
        }

        return storeState
    })

    registerStoreReset(() => store.getState().reset())

    return store
}