import { Container } from "@/components"
import { Alert, Notify } from "@/ui"
import { Card, Center, Loader, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { Download } from "../components";
import { fetchJuristics } from "../api";

export interface Data {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id: number;
    name: string;
    description: string;
    isNew: boolean;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const Juristic = () => {
    const theme = useMantineTheme()
    const [data, setData] = useState<Data>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleFetch = async () => {
        try {
            setLoading(true)

            const response = await fetchJuristics();
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
            title="Disposiciones Jurídicas Administrativas"
            description="Leyes, Códigos, Reglamentos, Decretos, Lineamientos, Acuerdos, Circulares, Manuales, Guías, Otros"
        >
            {loading
                ? (<Center h={"100%"}><Loader /></Center>)
                : data.data?.length > 0
                    ?
                    data.data.map((standar, index: number) => (
                        <Download {...standar} key={index} color={theme.primaryColor} />
                    ))
                    : (
                        <Card>
                            <Text ta="center" size="sm" c="dimmed">No se encontraron resultados.</Text>
                        </Card>)
            }
            <Alert
                color="yellow"
                title="Marco Legal y Normativo"
                content="Las disposiciones jurídicas y administrativas aquí presentadas constituyen el marco legal que rige las operaciones del centro hospitalario. Para consultas específicas o interpretación jurídica, favor de contactar al Departamento Jurídico de la institución."
            />
        </Container>
    )
}