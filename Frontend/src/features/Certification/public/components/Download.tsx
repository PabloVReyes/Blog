import { Badge, Button, Card, Flex, Group, Image, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import classes from "./Download.module.css"
import { formatFileSize, resolveFileMeta } from "@/utils"
import { IconAward, IconDownload, IconExternalLink } from "@tabler/icons-react"
import { downloadFile } from "../api"

export const Download = ({ id, color, name, description, fileSize, mimeType, fileName, isNew, type, filePath }: any) => {
    const download = async (id: string) => {
        try {
            const response = await downloadFile(id)

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
            const response = await downloadFile(id)

            const blob = new Blob([response.data], {
                type: response.headers["content-type"]
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

    const fileMeta = resolveFileMeta(mimeType, fileName)
    return (
        <Card
            className={classes.group}
        >
            <Flex justify="space-between" align="flex-start">
                <Flex gap="md" align="center" style={{ flex: 1 }}>
                    {type === "IMAGE"
                        ? <Image
                            className={classes.image}
                            src={`${`${import.meta.env.VITE_API_URL}/uploads/downloads/${filePath}`}`}
                        />
                        : <ThemeIcon
                            size={56}
                            variant="light"
                            className={`${classes.iconWrapper}`}
                            style={{
                                '--icon-rgb': `${color}` || "#40c057" // fallback green
                            } as React.CSSProperties}
                        >
                            <IconAward size={28} />
                        </ThemeIcon>
                    }

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

                        <Text size="xs" c="dimmed">
                            {fileMeta.label} • {formatFileSize(fileSize)}
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
                    {(fileMeta.label === "PDF" || fileMeta.label === "Imagen")
                        &&
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
                    }
                </Group>
            </Flex>
        </Card>

    )
}