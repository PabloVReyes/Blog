import { Search } from "@/shared"
import { Container, Group, Stack, Text, Title } from "@mantine/core"
import { UploadsTable } from "../components"
import { useEffect } from "react"
import { useFilesStore } from "../store"
import { Pagination } from "@/shared/components"

export const Uploads = () => {
    const { fetchFiles, items, page, limit, search, setSearch } = useFilesStore()

    useEffect(() => {
        fetchFiles()
    }, [page, limit, search])

    return (
        <Container>
            <Stack gap={"md"}>
                <Group align="center">
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Archivos</Title>
                        <Text c="dimmed" size="sm">Lista de todos los archivos que fueron cargados</Text>
                    </Stack>
                </Group>

                <Search
                    value={search}
                    onChange={setSearch}
                />

                <UploadsTable
                    items={items}
                />

                <Pagination
                    useStore={useFilesStore}
                />

            </Stack>
        </Container>
    )
}