import type { ItemProps } from "@/store/files/type"
import { useModalStore } from "@/store/modalStore"
import { ActionIcon, Card, Group, Image, Text } from "@mantine/core"
import { IconFile, IconInfoCircle, IconTrash } from "@tabler/icons-react"
import { CmpFileInformation } from "./CmpFileInformation"
import { CmpFileDelete } from "./CmpFileDelete"

const typeFile = (mime: string, url?: string) => {
    const type = mime.split("/")
    switch (type[0]) {
        case "image":
            return <Image
                src={url}
                fit="contain"
                height={160}
            />
        default:
            return <IconFile size={100} />
    }
}

export const CmpFileTableItem = (item: ItemProps) => {
    const { openModal } = useModalStore()

    const handleInformation = () => {
        openModal({
            title: "Informacion del archivo",
            content: <CmpFileInformation key={item.filename} {...item} />
        })
    }

    const handleDelete = () => {
        openModal({
            title: "Eliminar archivo",
            content: <CmpFileDelete filename={item.filename} />
        })
    }

    return (
        <Card pos="relative"
            display="flex"
            style={{
                flexDirection: "column",
                height: "100%",        // la card crece de acuerdo al grid
                minHeight: 250,        // tamaño mínimo uniforme
            }}
        >
            <Card.Section
                withBorder
                inheritPadding
                py="xs"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 180, // altura fija para el preview
                    overflow: "hidden",
                }}
            >
                <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {typeFile(item.mime, item.url)}
                </div>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Text size="sm" truncate="end">{item.filename}</Text>
                <Group justify="flex-end" gap={5} mt={10}>
                    <ActionIcon className="action" onClick={handleInformation}>
                        <IconInfoCircle size={16} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon className="action" onClick={handleDelete}>
                        <IconTrash size={16} color="var(--mantine-color-red-6)" stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Card.Section>
        </Card>
    )
}