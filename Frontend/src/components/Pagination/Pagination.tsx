// import type { PaginationState } from "@/store/paginationStore"
// import { Group, Pagination as PaginationMantine, Select, Text } from "@mantine/core"
// import type { StoreApi, UseBoundStore } from "zustand"
// import { useShallow } from "zustand/react/shallow"
import styles from "./Pagination.module.css"

import { Pagination as MantinePagination, Group, Select, Text } from "@mantine/core"

// interface Props {
//     useStore: UseBoundStore<StoreApi<PaginationState>>
// }

// export const Pagination = ({ useStore }: Props) => {
//     const { page, limit, totalItems, setPage, setLimit } = useStore(useShallow(state => ({
//         page: state.page,
//         limit: state.limit,
//         totalItems: state.totalItems,
//         setPage: state.setPage,
//         setLimit: state.setLimit,
//     })))

//     const { totalPages, firstItem, lastItem } = useStore.getState()

//     return (
//         <Group justify="space-between">
//             <Group gap={5}>
//                 <Text size="sm" c="dimmed">Mostrar</Text>

//                 <Select
//                     checkIconPosition="right"
//                     data={["10", "25", "50", "100"]}
//                     value={limit.toString()}
//                     onChange={(value) => {
//                         if (!value) return;
//                         setLimit(Number(value));
//                     }}
//                     w={80}
//                 />

//                 <Text size="sm" c="dimmed">elementos por página</Text>
//             </Group>

//             <Group gap={5}>
//                 <Text size="sm" c="dimmed">
//                     Mostrando {firstItem()} a {lastItem()} de {totalItems} resultados
//                 </Text>

//                 <PaginationMantine.Root
//                     classNames={styles}
//                     total={totalPages()}
//                     value={page}
//                     onChange={setPage}
//                     disabled={totalPages() < 1}
//                 >
//                     <Group gap={5}>
//                         <PaginationMantine.First />
//                         <PaginationMantine.Previous />
//                         <PaginationMantine.Items />
//                         <PaginationMantine.Next />
//                         <PaginationMantine.Last />
//                     </Group>
//                 </PaginationMantine.Root>
//             </Group>
//         </Group>
//     )
// }

interface Props {
    limit: number;
    onChangeLimit: (limit: number) => void;
    totalPages: number;
    page: number
    onChangePage: (page: number) => void;
    totalItems: number;
    firstItem: number;
    lastItem: number;
}

export const Pagination = ({ limit, onChangeLimit, totalPages, onChangePage, totalItems, firstItem, lastItem, page }: Props) => {
    const message = `Mostrando ${firstItem} a ${lastItem} de ${totalItems} registros`
    return (
        <Group justify="space-between">
            <Select
                classNames={{
                    option: styles.option
                }}
                searchable={false}
                data={[
                    { value: "10", label: "10 por página" },
                    { value: "25", label: "25 por página" },
                    { value: "50", label: "50 por página" },
                    { value: "100", label: "100 por página" },
                ]}
                allowDeselect={false}
                value={limit.toString()}
                onChange={(value) => {
                    onChangeLimit(Number(value));
                }}
                w={150} // ancho suficiente para mostrar el label
            />

            <Group justify="flex-end">
                <Text size="sm" c="dimmed">{message}</Text>
                <MantinePagination
                    classNames={styles}
                    gap={5}
                    total={totalPages}
                    onChange={onChangePage}
                    value={page}
                />
            </Group>
        </Group>
    )
}