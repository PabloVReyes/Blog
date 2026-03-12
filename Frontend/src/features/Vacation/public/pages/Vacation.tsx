import { Container } from "@/components"
import { Alert, Notify } from "@/ui"
import { Card, Center, Loader, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchVacations } from "../api";
import { Shift } from "../components";

export interface Data {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
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

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}


export const Vacation = () => {
    const [data, setData] = useState<Data>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleFetch = async () => {
        try {
            setLoading(true)

            const response = await fetchVacations();
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
            title="Rol Vacacional"
        >
            {loading
                ? (<Center h={"100%"}><Loader /></Center>)
                : data.data?.length > 0
                    ?
                    <SimpleGrid cols={{ base: 1, md: 3 }}>
                        {data.data.map((shift, index: number) => (
                            <Shift key={index} {...shift} />
                        ))}
                    </SimpleGrid>
                    : (
                        <Card>
                            <Text ta="center" size="sm" c="dimmed">No se encontraron resultados.</Text>
                        </Card>)
            }
            <Alert
                color="emerald"
                title="Información del Periodo Vacacional"
                content="Descarga los calendarios e índices vacacionales por turno. El periodo vacacional está organizado según el turno de trabajo: Matutino-Vespertino, Jornada Acumulada y Nocturno A y B. Las vacaciones deben solicitarse con 30 días de anticipación y requieren autorización del jefe inmediato superior."
            />
        </Container>
    )
}