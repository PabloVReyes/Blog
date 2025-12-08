import { Group, Pagination as PaginationMantine, Select, Text } from "@mantine/core"
import type { StoreApi, UseBoundStore } from "zustand"
import { useShallow } from "zustand/react/shallow"
import type { PaginationState } from "./type"

interface Props {
    useStore: UseBoundStore<StoreApi<PaginationState>>
}

export const CmpPagination = ({ useStore }: Props) => {
    const { page, limit, totalItems, setPage, setLimit } = useStore(useShallow(state => ({
        page: state.page,
        limit: state.limit,
        totalItems: state.totalItems,
        setPage: state.setPage,
        setLimit: state.setLimit,
    })))

    const { totalPages, firstItem, lastItem } = useStore.getState()

    return (
        <Group justify="space-between">
            <Group gap={5}>
                <Text size="sm" c="dimmed">Mostrar</Text>

                <Select
                    checkIconPosition="right"
                    data={["10", "25", "50", "100"]}
                    value={limit.toString()}
                    onChange={(value) => {
                        if (!value) return;
                        setLimit(Number(value));
                    }}
                    w={80}
                />

                <Text size="sm" c="dimmed">elementos por página</Text>
            </Group>

            <Group gap={5}>
                <Text size="sm" c="dimmed">
                    Mostrando {firstItem()} a {lastItem()} de {totalItems} resultados
                </Text>

                <PaginationMantine.Root
                    total={totalPages()}
                    value={page}
                    onChange={setPage}
                    disabled={totalPages() < 1}
                >
                    <Group gap={5}>
                        <PaginationMantine.First />
                        <PaginationMantine.Previous />
                        <PaginationMantine.Items />
                        <PaginationMantine.Next />
                        <PaginationMantine.Last />
                    </Group>
                </PaginationMantine.Root>
            </Group>
        </Group>
    )
}
