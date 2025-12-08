import { Card, Container, Group, Stack, Text, Title } from "@mantine/core"
import { CmpFilesTable } from "../../components"
import { usePrivateFilesStore } from "@/store/files/filesStore"
import { useEffect } from "react"
import { CmpPagination, CmpSearch } from "@/components"

export const Files = () => {
    const { fetchFiles, items, page, limit, search, setSearch } = usePrivateFilesStore()

    useEffect(() => {
        fetchFiles()
    }, [page, limit, search])

    return (
        <Container>
            <Stack gap="md">
                <Group align="center">
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Lista de archivos</Title>
                        <Text c="dimmed" size="sm">Lista de todos los archivos que fueron cargados</Text>
                    </Stack>
                </Group>

                <Card>
                    <CmpSearch
                        value={search}
                        onChange={setSearch}
                    />
                </Card>

                <CmpFilesTable
                    items={items}
                />

                <Card>
                    <CmpPagination
                        useStore={usePrivateFilesStore}
                    />
                </Card>
            </Stack>
        </Container>
    )
}