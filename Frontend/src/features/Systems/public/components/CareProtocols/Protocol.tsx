import { Button, Card, Flex, Group, Stack, Text, Title } from "@mantine/core"
import styles from "./Protocol.module.css"
import { IconDownload, IconExternalLink, IconFileText } from "@tabler/icons-react"
import { formatFileSize } from "@/utils"
import type { CareProtocolsData } from "@/features/Systems/types/careProtocols.types"
import { useDownloadFile } from "@/hooks"
import { ThemeIcon } from "@/components"

export const Protocol = ({ title, file, fileId, description }: CareProtocolsData) => {
    const { download, view } = useDownloadFile()
    return (
        <Card
            className={styles.group}
        >
            <Flex justify="space-between" align="flex-start">
                <Flex gap="md" align="center" style={{ flex: 1 }}>
                    <ThemeIcon>
                        <IconFileText size={28} />
                    </ThemeIcon>

                    <Stack gap={5} style={{ flex: 1 }}>
                        <Title order={5}>{title}</Title>
                        <Text size="sm" c="dimmed">
                            {description}
                        </Text>
                        <Text size="xs" c="dimmed">
                            {formatFileSize(file?.size ?? 0)}
                        </Text>
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
                        <IconDownload />
                    </Button>
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
                </Group>
            </Flex>
        </Card>
    )
}