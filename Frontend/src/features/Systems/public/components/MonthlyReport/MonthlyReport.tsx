import { Button, Card, Flex, Group, Stack, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core"
import { IconDownload, IconExternalLink, IconFileText } from "@tabler/icons-react"
import styles from "./MonthlyReport.module.css"
import { colorMap } from "@/utils/colors"
import { formatFileSize } from "@/utils"
import { downloadMonthlyReports } from "../../api"

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

interface Props {
    id: string;
    title: string;
    description: string;
    month: number;
    fileSize: number;
    type: string;
    period: Period;
}

export interface Period {
    id: string;
    year: number;
    createdAt: Date;
    updatedAt: Date;
}

export const MonthyReport = ({ id, title, description, month, fileSize, type, period }: Props) => {
    const theme = useMantineTheme()

    const download = async (id: string) => {
        try {
            const response = await downloadMonthlyReports(id)

            const disposition = response.headers["content-disposition"];

            const fileName =
                disposition?.split("filename=")[1]?.replace(/"/g, "") ||
                "manual.pdf";

            const blob = new Blob([response.data], {
                type: response.headers["content-type"]
            });

            const link = document.createElement("a");

            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(link.href);

        } catch (error) {
            console.error("Error al descargar archivo", error);
        }
    };

    const view = async (id: string) => {
        try {
            const response = await downloadMonthlyReports(id)

            const blob = new Blob([response.data], {
                type: "application/pdf",
            });

            const url = window.URL.createObjectURL(blob);

            window.open(url, "_blank");

            // Opcional: liberar memoria después de un tiempo
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);


        } catch (error) {
            console.error("Error al descargar archivo", error);
        }
    };

    return (
        <Card
            className={styles.group}
        >
            <Flex justify="space-between" align="flex-start">
                <Flex gap="md" align="flex-start" style={{ flex: 1 }}>
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
                                • {formatFileSize(fileSize)}
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
                        onClick={() => download(id)}
                    >
                        <IconDownload size={20} />
                    </Button>
                    <Button
                        variant="subtle"
                        p={6}
                        color="gray"
                        radius="md"
                        style={{ minWidth: 0 }}
                        onClick={() => view(id)}
                    >
                        <IconExternalLink size={20} />
                    </Button>
                </Group>
            </Flex>
        </Card>
    )
}