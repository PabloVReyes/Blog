import { Container } from "@/components"
import { Alert, Notify } from "@/ui"
import { Card, Center, Loader, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchStandards } from "../api";
import { Standar } from "../components";
import type { StandardsData } from "../../types/standards.types";

export interface Data {
    data: StandardsData[];
    meta: Meta;
} 

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}


export const Standards = () => {
    const theme = useMantineTheme()
    const [data, setData] = useState<Data>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleFetch = async () => {
        try {
            setLoading(true)

            const response = await fetchStandards();
            setData(response);
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener normas oficiales",
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
            title="Normas Oficiales Mexicanas"
            description="Las Normas Oficiales Mexicanas (NOM) son regulaciones técnicas de observancia obligatoria expedidas por las dependencias competentes, que tienen como finalidad establecer las características que deben reunir los procesos o servicios cuando estos puedan constituir un riesgo para la seguridad de las personas o dañar la salud humana; así como aquellas relativas a terminología y las que se refieran a su cumplimiento y aplicación.
                    Las NOM en materia de Prevención y Promoción de la Salud, una vez aprobadas por el Comité Consultivo Nacional de Normalización de Prevención y Control de Enfermedades (CCNNPCE) son expedidas y publicadas en el Diario Oficial de la Federación y, por tratarse de materia sanitaria, entran en vigor al día siguiente de su publicación."
        >
            {loading
                ? (<Center h={"100%"}><Loader /></Center>)
                : data.data?.length > 0
                    ?
                    data.data.map((standar) => (
                        <Standar {...standar} key={standar.id} color={theme.primaryColor} />
                    ))
                    : (
                        <Card>
                            <Text ta="center" size="sm" c="dimmed">No se encontraron resultados.</Text>
                        </Card>)
            }
            <Alert
                title="Actualizaciones y Modificaciones"
                content="Las normas oficiales están sujetas a actualizaciones periódicas. Verifica siempre la versión más reciente en el Diario Oficial de la Federación o consulta con el área de Calidad."
            />
        </Container>
    )
}