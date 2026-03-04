import { Container } from "@/components"
import { Alert, Notify } from "@/ui"
import { Card, Center, Group, Loader, SimpleGrid, Stack, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { Download } from "../components";
import { IconAlertCircleFilled, IconAward, IconFileText } from "@tabler/icons-react";
import { getCicloColor } from "@/utils";
import { fetchCertifications } from "../api";

export interface Data {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _count: Count;
    certifications: Certification[];
}

export interface Count {
    certifications: number;
}

export interface Certification {
    id: number;
    name: string;
    description: string;
    isNew: boolean;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    sectionId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const Certification = () => {
    const theme = useMantineTheme()
    const [data, setData] = useState<Data>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleFetch = async () => {
        try {
            setLoading(true)

            const response = await fetchCertifications();
            setData(response);
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener datos",
                message: error.message || "Error desconocido",
            });
        }

        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <Container
            title="Certificación"
            description="Material de trabajo del proceso de certificación hospitalaria"
        >
            {loading
                ? (<Center h={"100%"}><Loader /></Center>)
                : data.data?.length > 0
                    ?
                    data.data.map((section, index: number) => {
                        const colors = getCicloColor(index, theme.primaryColor)
                        return (
                            <Stack>
                                <Card
                                    p={16}
                                    key={index}
                                    style={{
                                        border: "none",
                                    }}
                                >
                                    <Card.Section
                                        p={"md"}
                                        style={{
                                            backgroundColor: `${colors.bg}`,
                                            color: `${colors.text}`
                                        }}
                                    >
                                        <Group justify="space-between">
                                            <Text fw={700}>{section.name}</Text>
                                        </Group>
                                    </Card.Section>
                                </Card>

                                {section.certifications.map((item, indexGPC: number) => (
                                    <Download {...item} key={indexGPC} color={colors.bg} />
                                ))}
                            </Stack>
                        )
                    })
                    : (
                        <Card>
                            <Text ta="center" size="sm" c="dimmed">No se encontraron resultados.</Text>
                        </Card>)
            }
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <Alert
                    color="blue"
                    title={
                        <Group align="center" gap="xs" mb="sm" wrap="nowrap">
                            <IconAward style={{ flex: "0 0 auto" }} />
                            <Text fw={600} fz="lg">
                                Modelo MUEC
                            </Text>
                        </Group>
                    }
                    content="El Modelo Único de Evaluación de la Calidad (MUEC) es el estándar utilizado por el Consejo de Salubridad General para certificar hospitales en México."
                />
                <Alert
                    color="emerald"
                    title={
                        <Group align="center" gap="xs" mb="sm" wrap="nowrap">
                            <IconFileText style={{ flex: "0 0 auto" }} />
                            <Text fw={600} fz="lg">
                                Documentación Requerida
                            </Text>
                        </Group>
                    }
                    content="Todos los documentos son necesarios para el proceso de certificación. Asegúrate de revisar y completar cada formato según los lineamientos establecidos."
                />
            </SimpleGrid>
            <Alert
                color="orange"
                title={
                    <Group align="center" gap="xs" mb="sm" wrap="nowrap">
                        <IconAlertCircleFilled style={{ flex: "0 0 auto" }} />
                        <Text fw={600} fz="lg">
                            Nota Importante
                        </Text>
                    </Group>
                }
                content={
                    <Text size="sm">
                        Los documentos marcados como <Text span fw={700}>NUEVO</Text> contienen las actualizaciones más recientes. Es responsabilidad de cada área revisar y aplicar los cambios correspondientes. Para dudas sobre el proceso de certificación, contacta al área de Calidad.
                    </Text>
                }
            />
        </Container>
    )
}