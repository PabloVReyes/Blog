import { ActionIcon, Group, Table, Tooltip } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { DeletePage } from "./DeletePage";
import { useModalStore } from "@/shared";

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
    onUpdate?: () => void;
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

export const PagesTable = ({ pages, onUpdate }: Props) => {
    const { openModal } = useModalStore()
    const navigate = useNavigate()

    const handleViewPage = (slug: string) => {
        navigate(`/${slug}`)
    }

    const handleDeletePage = (page: Page) => {
        openModal({
            title: "Eliminar página",
            content: <DeletePage id={page.id} title={page.title} onUpdate={onUpdate} />
        })
    }

    const renderRows = () => {
        return pages.map((page) => (
            <Table.Tr key={page.id}>
                <Table.Td>{page.title}</Table.Td>
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
                            <ActionIcon className="action" onClick={() => handleDeletePage(page)}>
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