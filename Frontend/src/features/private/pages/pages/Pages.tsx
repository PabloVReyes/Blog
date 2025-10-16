import { Button, Card, Container, Group, Stack, Text, Title } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { AddNewPage } from "../components/AddNewPage";
import { useEffect, useState } from "react";
import { getPages, getPagesCount } from "@/api/pages";
import { PagesTable } from "../components/PagesTable";
import { useDisclosure } from "@mantine/hooks";
import { usePageStore } from "@/store/paginationStore";
import { Pagination } from "@/components/Pagination";
import { Search } from "@/components/Search";

interface Page {
    id: string;
    content: string;
    html: string;
    slug: string;
    title: string;
    createdAt: string;
}


export const Pages = () => {
    const [opened, { open, close }] = useDisclosure(false)
    const [pages, setPages] = useState<Page[]>([]);

    const { setTotalItems, page, limit, search } = usePageStore()

    useEffect(() => {
        handlePagesUpdate()
    }, [page, limit, search])

    const handlePagesUpdate = () => {
        getPages(page, limit, search)
            .then(setPages)

        getPagesCount(search)
            .then(setTotalItems)
    }

    return (
        <Container>
            <Stack gap="md">
                <Group align="center">
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Lista de páginas</Title>
                        <Text c="dimmed" size="sm">Lista de todas las páginas que se encuentran almacenadas</Text>
                    </Stack>

                    <AddNewPage
                        opened={opened}
                        close={close}
                        onUpdate={handlePagesUpdate}
                    />

                    <Button leftSection={<IconPlus />} onClick={open}>
                        Crear nueva página
                    </Button>
                </Group>

                <Card>
                    <Stack gap="xl">
                        <Search
                            useStore={usePageStore}
                        />

                        <PagesTable
                            pages={pages}
                            onUpdate={handlePagesUpdate}
                        />

                        <Pagination
                            useStore={usePageStore}
                        />
                    </Stack>
                </Card>
            </Stack>
        </Container>
    )
}