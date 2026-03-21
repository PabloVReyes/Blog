import { createCrudStore, type CrudApi } from "./createCrudStore"

type StoreMap<Registry extends Record<string, CrudApi<any, any, any, any>>> = {
    [K in keyof Registry as `use${Capitalize<K & string>}Store`]:
    ReturnType<typeof createCrudStore<any, any, any, any>>
}

export function createCrudStores<
    Registry extends Record<string, CrudApi<any, any, any, any>>
>(registry: Registry): StoreMap<Registry> {

    const stores = {} as StoreMap<Registry>

    for (const key of Object.keys(registry) as Array<keyof Registry>) {

        const api = registry[key]

        const storeName =
            `use${String(key).charAt(0).toUpperCase()}${String(key).slice(1)}Store`

            // 🔴 SOLUCIÓN: casteo FINAL controlado (único punto)
            ; (stores as any)[storeName] = createCrudStore(api as any)
    }

    return stores
}