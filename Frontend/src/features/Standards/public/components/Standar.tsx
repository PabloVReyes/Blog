import { Badge, Button, Card, Flex, Group, Stack, Text, Title } from "@mantine/core"
import classes from "./Standar.module.css"
import { formatFileSize, resolveFileMeta } from "@/utils"
import { IconDownload, IconExternalLink, IconFileText } from "@tabler/icons-react"
import type { StandardsData } from "../../types/standards.types"
import { useDownloadFile } from "@/hooks"
import { ThemeIcon } from "@/components"

export const Standar = ({ name, description, isNew, file, fileId, category }: StandardsData) => {
    const { download, view } = useDownloadFile()

    const fileMeta = resolveFileMeta(file?.mimeType ?? "", file?.name ?? "")
    return (
        <Card
            className={classes.group}
        >
            <Flex justify="space-between" align="flex-start">
                <Flex gap="md" align="center" style={{ flex: 1 }}>

                    <ThemeIcon>
                        <IconFileText />
                    </ThemeIcon>

                    <Stack gap={5} style={{ flex: 1 }}>
                        <Group>
                            <Title order={5}>{name}</Title>
                            {isNew &&
                                <Badge size="xs" variant="filled">
                                    Nuevo
                                </Badge>
                            }
                        </Group>
                        {description &&
                            <Text size="sm" c="dimmed">
                                {description}
                            </Text>
                        }
                        <Group gap={5}>
                            <Badge
                                size="xs"
                                variant="filled"
                            >
                                {category.name}
                            </Badge>
                            <Text size="xs" c="dimmed">
                                - {fileMeta.label} • {formatFileSize(file?.size ?? 0)}
                            </Text>
                        </Group>
                    </Stack>
                </Flex>

                <Group gap={2}>
                    <Button
                        variant="subtle"
                        color="gray"
                        p={6}
                        radius="md"
                        style={{ minWidth: 0 }}
                        onClick={() => download(fileId)}
                    >
                        <IconDownload size={20} />
                    </Button>
                    {(fileMeta.label === "PDF" || fileMeta.label === "Imagen")
                        &&
                        <Button
                            variant="subtle"
                            p={6}
                            color="gray"
                            radius="md"
                            style={{ minWidth: 0 }}
                            onClick={() => view(fileId)}
                        >
                            <IconExternalLink size={20} />
                        </Button>
                    }
                </Group>
            </Flex>
        </Card>

    )
}