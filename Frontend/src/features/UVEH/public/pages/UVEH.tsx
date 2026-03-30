import { Container } from "@/components"
import { Alert, Notify } from "@/ui"
import { Card, Center, Group, Loader, Stack, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchDownlods } from "../api";
import { getCicloColor } from "@/utils";
import { Download } from "../components";
import type { UVEHData } from "../../types/UVEH.types";

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
    uvehs: UVEHData[];
}

export interface Count {
    uvehs: number;
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
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener UVEH",
                message: error instanceof Error ? error.message : "Error desconocido"
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
                                    key={category.id}
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

                                {category.uvehs.map((item) => (
                                    <Download {...item} key={item.id} color={colors.bg} />
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