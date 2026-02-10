import { ActionIcon, Card, Flex, Group, Text } from "@mantine/core"
import { IconInfoCircle, IconTrash } from "@tabler/icons-react"
import styles from "./styles.module.css"
import { typeFile } from "./utils"
import { Delete } from "../Delete/Delete"
import { Info } from "../Info"
import type { ItemProps } from "./types"
import { useModalStore } from "@/layout"

export const Item = (item: ItemProps) => {
    const { openModal } = useModalStore()

    const handleDeleteFile = () => {
        openModal({
            title: "Eliminar archivo",
            content: <Delete filename={item.filename} />
        })
    }

    const handleInfoFile = () => {
        openModal({
            title: "Informacion del archivo",
            content: <Info {...item} />
        })
    }

    return (
        <Card pos="relative"
            display="flex"
            style={{
                flexDirection: "column",
                height: "100%",
                minHeight: 250,
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
                    height: 198,
                    overflow: "hidden",
                }}
            >
                <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {typeFile(item.mime, item.url)}
                </div>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Flex justify="space-between" align="center">
                    <Text size="sm" truncate="end">
                        {item.filename}
                    </Text>
                    <Group gap={5} wrap="nowrap">
                        <ActionIcon className={styles.action} onClick={handleInfoFile}>
                            <IconInfoCircle size={16} className={styles.info} />
                        </ActionIcon>

                        <ActionIcon className={styles.action} onClick={handleDeleteFile}>
                            <IconTrash size={16} className={styles.trash} />
                        </ActionIcon>
                    </Group>
                </Flex>
            </Card.Section>
        </Card>
    )
}