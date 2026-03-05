import { Card, Center, Group, Button, Text } from "@mantine/core";
import { IconDownload, IconHelp } from "@tabler/icons-react";
import classes from "./Shift.module.css";
import * as TablerIcons from "@tabler/icons-react";
import { downloadFile } from "../api";

export interface Data {
    id: number;
    name: string;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    files: File[];
}

export interface File {
    id: number;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    type: string;
    shiftId: number;
    createdAt: Date;
}

export const Shift = (shift: Data) => {

    const Icon =
        shift.icon && (TablerIcons as Record<string, any>)[shift.icon];

    const calendar = shift.files.find((f) => f.type === "CALENDAR");
    const index = shift.files.find((f) => f.type === "INDEX");

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

    return (
        <Card withBorder padding={0} className={classes.card}>
            <div
                className={classes.iconContainer}
                style={{ backgroundColor: `${shift.color}20` }}
            >
                <Center>
                    {Icon ? (
                        <Icon
                            size={96}
                            stroke={1.5}
                            style={{ color: shift.color }}
                            className={classes.icon}
                        />
                    ) : (
                        <IconHelp size={96} stroke={1.5} />
                    )}
                </Center>
            </div>

            {/* Contenido */}
            <div className={classes.content}>
                <Text ta="center" fw={600} size="lg" mb="md">
                    {shift.name}
                </Text>

                <Group grow>
                    <Button
                        leftSection={<IconDownload size={16} />}
                        disabled={!calendar}
                        onClick={() => view(String(calendar?.id))}
                    >
                        Calendario
                    </Button>

                    <Button
                        leftSection={<IconDownload size={16} />}
                        disabled={!index}
                        onClick={() => view(String(index?.id))}
                    >
                        Índice
                    </Button>
                </Group>
            </div>
        </Card>
    );
};