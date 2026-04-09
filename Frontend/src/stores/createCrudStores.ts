import { createCrudStore, type CrudApi } from "./createCrudStore";

type BaseId = string | number;
type BaseEntity<ID extends BaseId> = { id: ID };

type StoreFromApi<T> = T extends CrudApi<infer E, infer C, infer U, infer F>
    ? C extends BaseId
    ? E extends BaseEntity<C>
    ? ReturnType<typeof createCrudStore<E, C, U, F>>
    : never
    : never
    : never;

type StoreMap<Registry extends Record<string, CrudApi<any, any, any, any>>> = {
    [K in keyof Registry as `use${Capitalize<K & string>}Store`]: StoreFromApi<Registry[K]>
};

export function createCrudStores<
    Registry extends Record<string, CrudApi<BaseEntity<any>, BaseId, any, any>>
>(registry: Registry): StoreMap<Registry> {

    const stores = {} as StoreMap<Registry>;

    (Object.keys(registry) as Array<keyof Registry & string>).forEach((key) => {
        const api = registry[key];

        const storeName = `use${key.charAt(0).toUpperCase()}${key.slice(1)}Store` as keyof StoreMap<Registry>;

        const store = createCrudStore(api);

        (stores as Record<string, unknown>)[storeName as string] = store;
    });

    return stores;
}