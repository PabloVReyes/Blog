import { Container } from "@/components"
import { Alert, Notify } from "@/ui"
import { Card, Center, Group, Loader, Stack, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchDownlods } from "../api";
import { getCicloColor } from "@/utils";
import { Download } from "../components";

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
    uvehs: Uveh[];
}

export interface Count {
    uvehs: number;
}

export interface Uveh {
    id: number;
    name: string;
    description: string;
    isNew: boolean;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const UVEH = () => {
    const theme = useMantineTheme()
    const [data, setData] = useState<Data>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });


    const [loading, setLoading] = useState<boolean>(false);

    const handleFetch = async () => {
        try {
            setLoading(true)

            const response = await fetchDownlods();
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
            title="Unidad de Vigilancia Epidemiológica Hospitalaria (UVEH)"
        >

            {loading
                ? (<Center h={"100%"}><Loader /></Center>)
                : data.data?.length > 0
                    ?
                    data.data.map((category, index: number) => {
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
                                            <Text fw={700}>{category.name}</Text>
                                        </Group>
                                    </Card.Section>
                                </Card>

                                {category.uvehs.map((item, indexGPC: number) => (
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
            <Alert
                color="cyan"
                title="Información Importante"
                content="Los documentos presentados corresponden a material oficial de la Unidad de Vigilancia Epidemiológica Hospitalaria (UVEH). Para cualquier duda o consulta adicional sobre casos de dengue y otras enfermedades de vigilancia epidemiológica, favor de contactar directamente al área de Epidemio"
            />
        </Container>
    )
}