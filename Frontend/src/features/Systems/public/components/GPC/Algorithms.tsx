import { Button, Card, Flex, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import styles from "./Algorithms.module.css"
import { IconDownload, IconExternalLink } from "@tabler/icons-react"
import { formatFileSize } from "@/utils"
import { downloadGPC } from "../../api"
import { getTablerIcon } from "@/helpers"

interface Props {
    id: string;
    title: string;
    fileSize: number;
    orderIndex: number;
    color: string;
    description: string;
}

export const GPCAlgorithms = ({ id, title, fileSize, orderIndex, color, description }: Props) => {
    const Icon = getTablerIcon(`IconHexagonNumber${orderIndex}Filled`)
        
    const download = async (id: string) => {
        try {
            const response = await downloadGPC(id)

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
            const response = await downloadGPC(id)

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
                            {formatFileSize(fileSize)}
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