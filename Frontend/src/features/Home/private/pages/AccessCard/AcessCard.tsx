import { Pagination, Search, Table } from "@/components"
import { Button, Card, Group, Stack, Title } from "@mantine/core"
import { columns } from "./TableColumns"
import { useEffect } from "react"
import { useAccessCardStore } from "../../store"
import { IconPlus } from "@tabler/icons-react"
import { useModalStore } from "@/layout"
import { AddAccessCard } from "../../components"
import { Notify } from "@/ui"

export const AccessCard = ({ id }: any) => {
    const { openModal } = useModalStore()
    const { fetch, items, search, setSearch, page, limit, setLimit, totalPages, totalItems, firstItem, lastItem, setPage, isLoading } = useAccessCardStore()

    useEffect(() => {
        handleFetch()
    }, [search, page, limit])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener sistemas",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: (
                <AddAccessCard
                    sectionId={id}
                />
            )
        })
    }

    return (
        <Card>
            <Stack>
                <Card.Section withBorder>
                    <Title order={4}>Accesos Rápidos</Title>
                </Card.Section>
                <Stack>
                    <Card>
                        <Group gap={5}>
                            <Search
                                value={search}
                                onChange={setSearch}
                            />
                            <Button
                                onClick={handleAdd}
                                leftSection={<IconPlus size={16} />}
                            >
                                Nuevo Elemento
                            </Button>
                        </Group>
                    </Card>
                    <Card>
                        <Table
                            columns={columns}
                            data={items}
                            isLoading={isLoading}
                        />
                    </Card>
                    <Card>
                        <Pagination
                            limit={limit}
                            onChangeLimit={setLimit}
                            totalPages={totalPages}
                            onChangePage={setPage}
                            totalItems={totalItems}
                            firstItem={firstItem}
                            lastItem={lastItem}
                            page={page}
                        />
                    </Card>
                </Stack>
            </Stack>
        </Card>
    )
}