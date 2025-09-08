import { ActionIcon, Group, Table, Tooltip } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface Page {
    id: string;
    content: string;
    html: string;
    slug: string;
    title: string;
    createdAt: string;
}

interface Props {
    pages: Page[]
}

const convertDate = (dateToConvert: string) => {
    const date = new Date(dateToConvert)

    return (date.toLocaleString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }));
}

export const PagesTable = ({ pages }: Props) => {
    const navigate = useNavigate()

    const handleViewPage = (slug: string) => {
        navigate(`/${slug}`)
    }

    const renderRows = () => {
        return pages.map((page) => (
            <Table.Tr key={page.id}>
                <Table.Td>{page.title.toUpperCase()}</Table.Td>
                <Table.Td>/{page.slug}</Table.Td>
                <Table.Td>{convertDate(page.createdAt)}</Table.Td>
                <Table.Td>
                    <Group align="center" gap={5}>
                        <Tooltip label="Ver">
                            <ActionIcon className="action" onClick={() => handleViewPage(page.slug)}>
                                <IconEye size={16} stroke={1.5} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Editar">
                            <ActionIcon className="action">
                                <IconEdit size={16} stroke={1.5} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Eliminar">
                            <ActionIcon className="action">
                                <IconTrash size={16} stroke={1.5} color="var(--mantine-color-red-6)" />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Table.Td>
            </Table.Tr>
        ))
    }

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="xs">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Titulo</Table.Th>
                        <Table.Th>Dirección URL</Table.Th>
                        <Table.Th>Fecha de publicación</Table.Th>
                        <Table.Th>Acciones</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{renderRows()}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}