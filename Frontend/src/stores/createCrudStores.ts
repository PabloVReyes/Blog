import { createCrudStore } from "./createCrudStore"

export function createCrudStores<
    Registry extends Record<string, any>
>(registry: Registry) {

    const stores: any = {}

    for (const key in registry) {

        const api = registry[key]

        const storeName =
            `use${key.charAt(0).toUpperCase()}${key.slice(1)}Store`

        stores[storeName] = createCrudStore(api)
    }

    return stores as {
        [K in keyof Registry as
        `use${Capitalize<string & K>}Store`
        ]: ReturnType<typeof createCrudStore>
    }
}