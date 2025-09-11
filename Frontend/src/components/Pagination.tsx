import type { PaginationState } from "@/store/paginationStore"
import { Group, Pagination as PaginationMantine, Select, Text } from "@mantine/core"
import type { StoreApi, UseBoundStore } from "zustand"

interface Props {
    useStore: UseBoundStore<StoreApi<PaginationState>>
}

export const Pagination = ({ useStore }: Props) => {
    const { page, setPage, limit, setLimit, totalItems } = useStore()
    const totalPages = useStore().totalPages()
    const firstItem = useStore().firstItem()
    const lastItem = useStore().lastItem()

    return (
        <Group justify="space-between">
            <Group gap={5}>
                <Text size="sm" c="dimmed">Mostrar</Text>
                <Select
                    checkIconPosition="right"
                    data={["10", "25", "50", "100"]}
                    value={limit.toString()}
                    onChange={(value) => setLimit(Number(value))}
                    w={80}
                />
                <Text size="sm" c="dimmed">elementos por página</Text>
            </Group>

            <Group gap={5}>
                <Text size="sm" c="dimmed">Mostrando {firstItem} a {lastItem} de {totalItems} resultados</Text>
                <PaginationMantine.Root
                    total={totalPages}
                    value={page}
                    onChange={setPage}
                    disabled={totalPages < 1}
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