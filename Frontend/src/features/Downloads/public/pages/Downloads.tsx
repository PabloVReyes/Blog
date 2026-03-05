import { Container } from "@/components"
import { Alert, Notify } from "@/ui"
import { Card, Center, Loader, SimpleGrid, Text } from "@mantine/core"
import { Areas } from "../components"
import { useEffect, useState } from "react";
import { fetchAreas } from "../api";

interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    firstItem: number;
    lastItem: number;
}

interface DataMeta {
    data: any[]
    meta: Meta
}

export const Downloads = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<DataMeta>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0, firstItem: 0, lastItem: 0 },
    });


    const handleFetch = async () => {
        try {
            setLoading(true)
            const response = await fetchAreas();
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
            title="Descargar Información"
            description="Descarga de información de diferentes áreas"
        >
            <Card>
                {loading
                    ? <Center><Loader /></Center>
                    : data.data.length > 0
                        ? <SimpleGrid cols={{ xs: 2, sm: 3, md: 5 }} spacing={"lg"} style={{ textAlign: "center" }}>
                            {data.data.map((item, index: number) => (
                                <Areas key={index} {...item} />
                            ))}
                        </SimpleGrid>
                        : <Text ta="center" size="sm" c="dimmed">No se encontraron resultados.</Text>

                }
            </Card>

            <Alert
                color="emerald"
                title="Información"
                content="Haz clic en cualquier departamento para acceder a los documentos y archivos disponibles para descarga. Los archivos están organizados por categoría y fecha de publicación."
            />
        </Container>
    )
}