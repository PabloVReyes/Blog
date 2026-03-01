import { Container } from "@/components"
import { useEffect, useState } from "react";
import { fetchGPC } from "../api";
import { Alert, Notify } from "@/ui";
import { Badge, Card, Center, Group, Loader, Stack, Text, useMantineTheme } from "@mantine/core";
import { getCicloColor } from "@/utils";
import { GPCAlgorithms } from "../components";

interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    firstItem: number;
    lastItem: number;
}

interface GPCS {
    cicleId: string;
    description: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    id: string;
    mimeType: string;
    orderIndex: number;
    title: string;
}

interface Data {
    gpcs: GPCS[]
    id: string;
    name: string;
    _count: {
        gpcs: number
    }
}

interface AgreementData {
    data: Data[];
    meta: Meta;
}

export const GPC = () => {
    const theme = useMantineTheme()
    const [data, setData] = useState<AgreementData>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0, firstItem: 0, lastItem: 0 },
    });


    const [loading, setLoading] = useState<boolean>(false);

    const handleFetch = async () => {
        try {
            setLoading(true)

            const response = await fetchGPC();
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
            title="Algoritmos GPC - Algoritmos de las Guías de Práctica Clínica"
            description="Representaciones gráficas y secuenciales de las recomendaciones basadas en evidencia científica para el diagnóstico, tratamiento y seguimiento de enfermedades"
        >
            {loading
                ? (<Center h={"100%"}><Loader /></Center>)
                : data.data?.length > 0
                    ?
                    data.data.map((cicle, index: number) => {
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
                                            <Text fw={700}>{cicle.name}</Text>
                                            <Badge
                                                variant="filled"
                                                px={"12px"}
                                                py={"4px"}
                                                color={`${colors.badge}`}
                                            >
                                                {cicle._count.gpcs}{" "}
                                                {cicle._count.gpcs === 1 ? "algoritmo" : "algoritmos"}
                                            </Badge>
                                        </Group>
                                    </Card.Section>
                                </Card>

                                {cicle.gpcs.map((item, indexGPC: number) => (
                                    <GPCAlgorithms {...item} key={indexGPC} color={colors.bg} />
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
                title="Sobre los Algoritmos GPC"
                content={
                    <div>
                        <Text size="sm">Los Algoritmos de Guías de Práctica Clínica (GPC) están organizados en tres ciclos para facilitar su consulta y aplicación sistemática.</Text>
                        <Text size="sm">📌 Estos algoritmos están basados en las GPC del CENETEC y actualizados según la evidencia científica más reciente.</Text>
                    </div>
                }
            />
        </Container>
    )
}