import { Button, Card, Flex, Group, Stack, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core"
import styles from "./Algorithms.module.css"
import { IconDownload, IconExternalLink, IconFileText } from "@tabler/icons-react"
import { colorMap, formatFileSize } from "@/utils"
import type { PMBData } from "@/features/Systems/types/pbm.types"
import { useDownloadFile } from "@/hooks"


export const PBMAlgorithms = ({ title, fileId, file}: PMBData) => {
    const theme = useMantineTheme()
    const { download, view } = useDownloadFile()

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
                            '--icon-rgb': `${colorMap[theme.primaryColor]}` || "#40c057" // fallback green
                        } as React.CSSProperties}
                    >
                        <IconFileText size={28} />
                    </ThemeIcon>

                    <Stack gap={5} style={{ flex: 1 }}>
                        <Group gap="sm">
                            <Title order={5}>{title}</Title>
                        </Group>
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
                        <IconDownload size={20} />
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