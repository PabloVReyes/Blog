import { Alert, Container } from "@/components"
import { Notify } from "@/ui"
import { Card, Center, Loader, SimpleGrid, Text } from "@mantine/core"
import { Areas } from "../components"
import { useEffect, useState } from "react";
import { fetchAreas } from "../api";

export interface Data {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id: number;
    name: string;
    slug: string;
    icon: string;
    color: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}


export const Downloads = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Data>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });

    const handleFetch = async () => {
        try {
            setLoading(true)
            const response = await fetchAreas();
            setData(response);
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener descargas",
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
            title="Descargar Información"
            description="Descarga de información de diferentes áreas"
        >
            <Card>
                {loading
                    ? <Center><Loader /></Center>
                    : data.data.length > 0
                        ? <SimpleGrid cols={{ xs: 2, sm: 3, md: 5 }} spacing={"lg"} style={{ textAlign: "center" }}>
                            {data.data.map((item) => (
                                <Areas key={item.id} {...item} />
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