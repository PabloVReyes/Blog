import { Card, Center, Group, Button, Text } from "@mantine/core";
import { IconDownload, IconHelp } from "@tabler/icons-react";
import classes from "./Shift.module.css";
import { getTablerIcon } from "@/helpers";
import { useDownloadFile } from "@/hooks";
import type { ShiftData } from "../../types/vacations.types";



export const Shift = (shift: ShiftData) => {
    const Icon = getTablerIcon(shift.icon)
    const { view } = useDownloadFile()

    const calendar = shift.files.find((f) => f.type === "CALENDAR");
    const index = shift.files.find((f) => f.type === "INDEX");

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
                        onClick={() => view(String(calendar?.fileId))}
                    >
                        Calendario
                    </Button>

                    <Button
                        leftSection={<IconDownload size={16} />}
                        disabled={!index}
                        onClick={() => view(String(index?.fileId))}
                    >
                        Índice
                    </Button>
                </Group>
            </div>
        </Card>
    );
};