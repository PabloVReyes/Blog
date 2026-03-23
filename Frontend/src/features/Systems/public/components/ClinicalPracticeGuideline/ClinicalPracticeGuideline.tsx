import { Badge, Button, Card, Flex, Group, Stack, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core"
import styles from "./ClinicalPracticeGuideline.module.css"
import { colorMap } from "@/utils"
import { IconDownload, IconFileText } from "@tabler/icons-react"
import type { ClinicalPracticeGuidelinesData } from "@/features/Systems/types/ClinicalPracticeGuidelines.types"
import { useDownloadFile } from "@/hooks"

export const ClinicalPracticeGuideline = ({ title, fileERId, fileRRId, code, category }: ClinicalPracticeGuidelinesData) => {
    const theme = useMantineTheme()
    const { download } = useDownloadFile()

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
                            <Badge
                                variant="light"
                                size="sm"
                            >{category.name}</Badge>
                        </Group>

                        <Text size="xs" c="dimmed">
                            {code}
                        </Text>
                    </Stack>
                </Flex>

                <Group gap={5}>
                    <Button
                        size="xs"
                        color="green"
                        radius="md"
                        style={{ minWidth: 0 }}
                        c={"white"}
                        leftSection={
                            <IconDownload size={20} />
                        }
                        onClick={() => download(fileERId)}
                    >
                        BR
                    </Button>
                    <Button
                        color="orange"
                        size="xs"
                        radius="md"
                        style={{ minWidth: 0 }}
                        leftSection={
                            <IconDownload size={20} />
                        }
                        c={"white"}
                        onClick={() => download(fileRRId)}
                    >
                        RR
                    </Button>
                </Group>
            </Flex>
        </Card>
    )
}