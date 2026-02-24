import { Container, Panel } from "@/components"
import { Alert, Notify } from "@/ui"
import { Card, Center, Group, Loader, Select, Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react";
import { fetchCategorys, fetchGuides } from "../api";
import { useDebouncedValue } from "@mantine/hooks";
import { ClinicalPracticeGuideline } from "../components";

interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    firstItem: number;
    lastItem: number;
}

interface AgreementData {
    data: any[];
    meta: Meta;
}

interface Categorys {
    id: Number
    name: string
}

export const ClinicalPracticeGuidelines = () => {
    const [data, setData] = useState<AgreementData>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0, firstItem: 0, lastItem: 0 },
    });

    const [categorys, setCategorys] = useState<Categorys[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [search, setSearch] = useState<string>("");
    const [debounced] = useDebouncedValue(search, 500);


    // Traer categorias
    const fetchFilters = async () => {
        try {
            const categorysResp = await fetchCategorys();
            setCategorys(categorysResp.data || []);
        } catch (error: any) {
            console.error("Error fetching filters:", error);
            setCategorys([]);
        }
    };

    const handleFetch = async (searchValue?: string) => {
        try {
            setLoading(true)

            const response = await fetchGuides({
                page,
                limit,
                search: searchValue,
                categoryId: selectedCategory !== "all" ? selectedCategory : undefined,
            });
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
        fetchFilters();
    }, []);

    useEffect(() => {
        handleFetch();
    }, [limit, page, selectedCategory]);

    useEffect(() => {
        const trimmed = debounced.trim();

        setPage(1);          // reinicia a la primera página siempre

        if (debounced && trimmed === "") {
            // Usuario escribió solo espacios → no hacemos fetch
            return;
        }

        // Si trimmed tiene contenido o es vacío real, hacemos fetch
        handleFetch(trimmed || undefined);
    }, [debounced]);

    return (
        <Container
            title="Guías de Práctica Clínica"
            description="Conjunto de recomendaciones basadas en la mejor evidencia científica, desarrolladas sistemáticamente para ayudar a profesionales de la salud y pacientes a tomar decisiones sobre la atención médica más adecuada para una condición específica, buscando optimizar la calidad, seguridad y eficiencia del cuidado, y reduciendo la variabilidad clínica"
        >
            <Panel
                search
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar por título o clave..."
                limit
                limitValue={limit}
                onChangeLimit={setLimit}
                page
                pageValue={page}
                onChangePage={setPage}
                totalPages={data.meta.totalPages}
                totalItems={data.meta.total}
                firstItem={data.meta.firstItem}
                lastItem={data.meta.lastItem}
            >
                <Card>
                    <Group justify="flex-end">
                        <Select
                            value={selectedCategory}
                            onChange={(val) => setSelectedCategory(val || "all")}
                            data={[
                                { value: "all", label: "Todos las categorias" },
                                ...categorys.map((g) => ({ value: g.id.toString(), label: g.name })),
                            ]}
                            placeholder="Filtrar por grupo"
                            w={{ base: "100%", sm: 200 }}
                        />
                    </Group>
                </Card>
                {loading ? (
                    <Center h={200}><Loader /></Center>
                )
                    : data.data?.length > 0
                        ? data.data.map((item, index: number) => (
                            <ClinicalPracticeGuideline {...item} key={index} />
                        ))
                        : (
                            <Card>
                                <Text ta="center" size="sm" c="dimmed">No se encontraron resultados.</Text>
                            </Card>
                        )
                }
            </Panel>
            <Alert
                title="Información sobre las Guías"
                content={
                    <Stack>
                        <div>
                            <Text size="sm"><Text span fw={700}>ER (Guía de Evidencias y Recomendaciones):</Text> Guía completa y detallada</Text>
                            <Text size="sm"><Text span fw={700}>RR (Guía de Referencia Rápida):</Text> Resumen ejecutivo enfocado en la aplicación práctica</Text>
                        </div>
                        <Text size="sm">
                            Para actualización de esta información comunicarse al área de calidad del hospital
                        </Text>
                    </Stack>
                }
            />
        </Container>
    )
}