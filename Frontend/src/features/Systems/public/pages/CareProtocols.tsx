import { Alert, Container } from "@/components"
import { useEffect, useState } from "react";
import { fetchCareCategory } from "../api";
import { Notify } from "@/ui";
import { Badge, Card, Center, Group, Loader, Stack, Text, useMantineTheme } from "@mantine/core";
import { getCicloColor } from "@/utils";
import { Protocol } from "../components";
import type { CareProtocolsData } from "../../types/careProtocols.types";

interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    firstItem: number;
    lastItem: number;
}

interface Data {
    careProtocols: CareProtocolsData[]
    id: string;
    name: string;
    _count: {
        careProtocols: number
    }
}

interface AgreementData {
    data: Data[];
    meta: Meta;
}

export const CareProtocols = () => {
    const theme = useMantineTheme()
    const [data, setData] = useState<AgreementData>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0, firstItem: 0, lastItem: 0 },
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleFetch = async () => {
        try {
            setLoading(true)

            const response = await fetchCareCategory();
            setData(response);
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener protocolos",
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
            title="Protocolos de Atención (Pediatría)"
            description="Guías estandarizadas basadas en evidencia científica que definen los procedimientos de prevención, diagnóstico y tratamiento para enfermedades infantiles"
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
                                        border: "none"
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
                                            <Badge
                                                variant="filled"
                                                px={"12px"}
                                                py={"4px"}
                                                color={`${colors.badge}`}
                                            >
                                                {category._count.careProtocols}{" "}
                                                {category._count.careProtocols === 1 ? "protocolo" : "protocolos"}
                                            </Badge>
                                        </Group>
                                    </Card.Section>

                                    {category.careProtocols.map((item) => (
                                        <Protocol {...item} key={item.id} color={colors.bg} />
                                    ))}
                                </Card>
                            </Stack>
                        )
                    })
                    : (<Card>
                        <Text ta="center" size="sm" c="dimmed">No se encontraron resultados.</Text>
                    </Card>)
            }
            <Alert
                color="cyan"
                title="Sobre los Protocolos de Atención Pediátrica"
                content={
                    <div>
                        <Text size="sm">Los protocolos de atención pediátrica son guías clínicas estandarizadas que establecen los procedimientos diagnósticos y terapéuticos para patologías específicas.</Text>
                        <Text size="sm">📌 Estos protocolos están alineados con las guías de práctica clínica nacionales e internacionales y son de aplicación obligatoria en el servicio de Pediatría.</Text>
                    </div>
                }
            />
        </Container>
    )
}