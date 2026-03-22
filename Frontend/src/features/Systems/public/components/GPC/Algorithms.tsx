import { Button, Card, Flex, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import styles from "./Algorithms.module.css"
import { IconDownload, IconExternalLink } from "@tabler/icons-react"
import { formatFileSize } from "@/utils"
import { getTablerIcon } from "@/helpers"
import { useDownloadFile } from "@/hooks"
import type { GPCData } from "@/features/Systems/types/gpc.types"

interface Props extends GPCData {
    color: string;
}

export const GPCAlgorithms = ({ title, orderIndex, file, description, color }: Props) => {
    const { download, view } = useDownloadFile()
    const Icon = getTablerIcon(`IconHexagonNumber${orderIndex}Filled`)

    return (
        <Card
            className={styles.group}
        >
            <Flex justify="space-between" align="flex-start">
                <Flex gap="md" align="center" style={{ flex: 1 }}>
                    <ThemeIcon
                        size={56}
                        variant="light"
                        className={`${styles.iconWrapper}`}
                        style={{
                            '--icon-rgb': `${color}` || "#40c057" // fallback green
                        } as React.CSSProperties}
                    >
                        <Icon size={28} />
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
                        onClick={() => download(file?.id ?? "")}
                    >
                        <IconDownload size={20} />
                    </Button>
                    <Button
                        variant="subtle"
                        p={6}
                        color="gray"
                        radius="md"
                        style={{ minWidth: 0 }}
                        onClick={() => view(file?.id ?? "")}
                    >
                        <IconExternalLink size={20} />
                    </Button>
                </Group>
            </Flex>
        </Card>
    )
}