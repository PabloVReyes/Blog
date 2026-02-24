import { Badge, Button, Card, Flex, Group, Stack, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core"
import styles from "./ClinicalPracticeGuideline.module.css"
import { colorMap } from "@/utils"
import { IconDownload, IconFileText } from "@tabler/icons-react"
import { downloadGuide } from "../../api"

export const ClinicalPracticeGuideline = ({ id, title, code, category }: any) => {
    const theme = useMantineTheme()

    const download = async (id: string, type: string) => {
        try {
            const response = await downloadGuide(id, type)

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
                        onClick={() => download(id, "ER")}
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
                        onClick={() => download(id, "RR")}
                    >
                        RR
                    </Button>
                </Group>
            </Flex>
        </Card>
    )
}