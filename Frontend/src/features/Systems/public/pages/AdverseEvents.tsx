import { Container } from "@/components"
import { Alert } from "@/ui";
import { Box, Card, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconAlertCircle, IconArrowNarrowRight, IconClipboardText, IconDownload, IconFileTypePdf, IconPointFilled, IconQrcode, IconSend } from "@tabler/icons-react";
import classes from "./AdverseEvents.module.css"
import { useEffect, useState } from "react";
import { fetchAdverseEvent } from "../api";
import type { FileData } from "@/types";
import { useDownloadFile } from "@/hooks";

export interface Data {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id: string;
    title: string;
    type: string;
    fileId: string;
    file: FileData | null;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    firstItem: number;
    lastItem: number;
}

export const AdverseEvents = () => {
    const {view} = useDownloadFile()
    const [data, setData] = useState<Data>({
        data: [],
        meta: { total: 0, page: 0, limit: 0, totalPages: 0, firstItem: 0, lastItem: 0 }
    })

    useEffect(() => {
        fetchAdverseEvent().then(setData)
    }, [])

    const qrItem = data.data.find(item => item.type === "qr");
    const fileItem = data.data.find(item => item.type === "file");

    return (
        <Container
            title="Eventos Adversos"
            description="Sistema de Notificación y Reporte de Eventos Adversos CAE"
        >
            <Alert
                color="blue"
                title={
                    <Group align="center" gap={5} mb="sm">
                        <IconClipboardText />
                        <Text fw={600} fz="lg">
                            ¿Qué es un Evento Adverso?
                        </Text>
                    </Group>
                }
                content={
                    <Stack>
                        <Text size="sm">Un "Evento Adverso" es el daño que sufre un paciente, como consecuencia de errores, incidentes, acciones o desviaciones durante su atención médica</Text>
                    </Stack>
                }
            />

            <Alert
                color="cyan"
                title={
                    <Group align="center" gap={5} mb="sm">
                        <IconClipboardText />
                        <Text fw={600} fz="lg">
                            ¿Por qué es importante notificar?
                        </Text>
                    </Group>
                }
                content={
                    <Stack>
                        <Text size="sm">Porque al informar de un evento adverso se toman las medidas para mejorar los procesos de atención mediante las Acciones Escenciales de Seguridad del Paciente y así dignificar nuestro trabajo.</Text>
                    </Stack>
                }
            />

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">

                {/* ================= REPORTE EN LÍNEA ================= */}
                <Paper
                    component="button"
                    onClick={() => view(qrItem?.fileId ?? "")}
                    radius={15}
                    p="xl"
                    className={`${classes.card} ${classes.orange}`}
                >
                    {/* Fondo decorativo */}
                    <Box className={classes.filePattern}>
                        <IconQrcode size={220} className={classes.file1} />

                    </Box>

                    <Box className={classes.content}>
                        <Group mb="md">
                            <ThemeIcon size={48} radius={"lg"} className={classes.icon}>
                                <IconSend size={24} color="white" />
                            </ThemeIcon>
                        </Group>

                        <Text size="xl" fw={700} c="white" mb={4}>
                            Reporte en línea
                        </Text>

                        <Text size="sm" c="white" mb="lg" opacity={0.9}>
                            Notificación de Evento Adverso CAE
                        </Text>

                        <Group gap={6} c="white" fw={500}>
                            <Text size="sm">Ver más...</Text>
                            <IconArrowNarrowRight
                                size={20}
                                className={classes.arrow}
                            />
                        </Group>
                    </Box>

                    <Box className={classes.overlay} />
                </Paper>

                {/* ================= FORMATO FÍSICO ================= */}
                <Paper
                    component="button"
                    onClick={() => view(fileItem?.fileId ?? "")}
                    radius={15}
                    p="xl"
                    className={`${classes.card} ${classes.blue}`}
                >
                    <Box className={classes.filePattern}>
                        <IconFileTypePdf size={220} className={classes.file1} />
                    </Box>

                    <Box className={classes.content}>
                        <Group mb="md">
                            <ThemeIcon size={48} radius="lg" className={classes.icon}>
                                <IconDownload size={24} color="white" />
                            </ThemeIcon>
                        </Group>

                        <Text size="xl" fw={700} c="white" mb={4}>
                            Formato Físico
                        </Text>

                        <Text size="sm" c="white" mb="lg" opacity={0.9}>
                            en PDF de Evento Adverso CAE
                        </Text>

                        <Group gap={6} c="white" fw={500}>
                            <Text size="sm">Ver más...</Text>
                            <IconArrowNarrowRight
                                size={20}
                                className={classes.arrow}
                            />
                        </Group>
                    </Box>

                    <Box className={classes.overlay} />
                </Paper>

            </SimpleGrid>

            <SimpleGrid cols={{ md: 3, sm: 1 }}>
                <Card>
                    <Stack gap={5}>
                        <ThemeIcon
                            variant="light"
                            size={40}
                            color="orange"
                            className="themeIcon"
                        >
                            <IconSend size={20} />
                        </ThemeIcon>
                        <Text fw={900} size="lg">Reporte Inmediato</Text>
                        <Text size="sm">El reporte en línea permite notificar el evento de manera inmediata y obtener un folio de seguimiento.</Text>
                    </Stack>
                </Card>

                <Card>
                    <Stack gap={5}>
                        <ThemeIcon
                            variant="light"
                            size={40}
                            color="cyan"
                            className="themeIcon"
                        >
                            <IconDownload size={20} />
                        </ThemeIcon>
                        <Text fw={900} size="lg">Formato Descargable</Text>
                        <Text size="sm">Descargue el formato PDF para llenarlo manualmente y entregarlo en el área correspondiente.</Text>
                    </Stack>
                </Card>

                <Card>
                    <Stack gap={5}>
                        <ThemeIcon
                            variant="light"
                            size={40}
                            color="green"
                            className="themeIcon"
                        >
                            <IconAlertCircle size={20} />
                        </ThemeIcon>
                        <Text fw={900} size="lg">Confidencialidad</Text>
                        <Text size="sm"> Todos los reportes son confidenciales y sin fines punitivos, buscando únicamente la mejora continua.</Text>
                    </Stack>
                </Card>
            </SimpleGrid>

            <Card>
                <Stack>
                    <Text fw={900} size="lg">Tipos de Eventos Adversos a Reportar</Text>
                    <SimpleGrid cols={{ sm: 1, md: 3 }} spacing={"xl"}>
                        <Stack gap={5}>
                            <Group gap={5}>
                                <IconPointFilled color={"var(--mantine-primary-color-filled)"} />
                                <Text fw={900} size="md">Errores de medicación</Text>
                            </Group>
                            <Text size="sm">Dosis incorrecta, medicamento equivocado, vía errónea</Text>
                        </Stack>
                        <Stack gap={5}>
                            <Group gap={5}>
                                <IconPointFilled color={"var(--mantine-primary-color-filled)"} />
                                <Text fw={900} size="md">Caídas de pacientes</Text>
                            </Group>
                            <Text size="sm">Caídas de cama, camilla o durante traslado</Text>
                        </Stack>
                        <Stack gap={5}>
                            <Group gap={5}>
                                <IconPointFilled color={"var(--mantine-primary-color-filled)"} />
                                <Text fw={900} size="md">Infecciones nosocomiales</Text>
                            </Group>
                            <Text size="sm">Infecciones adquiridas en el hospital</Text>
                        </Stack>
                        <Stack gap={5}>
                            <Group gap={5}>
                                <IconPointFilled color={"var(--mantine-primary-color-filled)"} />
                                <Text fw={900} size="md">Errores quirúrgicos</Text>
                            </Group>
                            <Text size="sm">Procedimiento incorrecto, sitio equivocado</Text>
                        </Stack>
                        <Stack gap={5}>
                            <Group gap={5}>
                                <IconPointFilled color={"var(--mantine-primary-color-filled)"} />
                                <Text fw={900} size="md">Úlceras por presión</Text>
                            </Group>
                            <Text size="sm">Lesiones por presión prolongada</Text>
                        </Stack>
                        <Stack gap={5}>
                            <Group gap={5}>
                                <IconPointFilled color={"var(--mantine-primary-color-filled)"} />
                                <Text fw={900} size="md">Otros eventos</Text>
                            </Group>
                            <Text size="sm">Cualquier evento que afecte la seguridad</Text>
                        </Stack>
                    </SimpleGrid>
                </Stack>
            </Card>
        </Container >
    )
}