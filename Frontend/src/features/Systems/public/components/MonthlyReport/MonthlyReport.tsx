import { Button, Card, Flex, Group, Stack, Text, Title } from "@mantine/core"
import { IconDownload, IconExternalLink, IconFileText } from "@tabler/icons-react"
import styles from "./MonthlyReport.module.css"
import { formatFileSize } from "@/utils"
import type { MonthlyReportsData } from "@/features/Systems/types/monthlyReports.types"
import { useDownloadFile } from "@/hooks"
import { ThemeIcon } from "@/components"

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const selectType = (type: string) => {
    switch (type) {
        case "MONTHLY":
            return "Mensual"
        case "ANNUAL":
            return "Anual"
        case "STATISTICAL":
            return "Estadistico"
        case "EXTRA":
            return "Extra"
    }
}


export const MonthyReport = ({ title, description, month, file, type, period }: MonthlyReportsData) => {
    const { download, view } = useDownloadFile()
    return (
        <Card
            className={styles.group}
        >
            <Flex justify="space-between" align="flex-start">
                <Flex gap="md" align="center" style={{ flex: 1 }}>
                    <ThemeIcon>
                        <IconFileText />
                    </ThemeIcon>

                    <Stack gap={5} style={{ flex: 1 }}>
                        <Group gap="sm">
                            <Title order={5}>{title}</Title>
                        </Group>

                        <Text size="xs" c="dimmed">
                            {description}
                        </Text>

                        <Group gap={5}>
                            <Text size="xs" c="dimmed">
                                {type === "MONTHLY" ? months[month - 1] : selectType(type)}
                            </Text>
                            <Text size="xs" c="dimmed">
                                {period.year}
                            </Text>
                            <Text size="xs" c="dimmed">
                                • {formatFileSize(file?.size ?? 0)}
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