import { Container, Panel } from "@/components"
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { fetchPBM } from "../api";
import { Notify } from "@/ui";
import { Card, Center, Loader, Text } from "@mantine/core";
import { Algorithms } from "../components";

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

export const PBM = () => {
    const [data, setData] = useState<AgreementData>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0, firstItem: 0, lastItem: 0 },
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [search, setSearch] = useState<string>("");
    const [debounced] = useDebouncedValue(search, 500);

    const handleFetch = async (searchValue?: string) => {
        try {
            setLoading(true)

            const response = await fetchPBM({
                page,
                limit,
                search: searchValue,
            });
            setData(response);
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener algoritmos",
                message: error.message || "Error desconocido",
            });
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        handleFetch();
    }, [limit, page]);

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
            title="Algoritmos PBM"
            description="Protocolos o guías de actuación basadas en la evidencia utilizadas dentro del Patient Blood Management"
        >
            <Panel
                search
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar Algoritmo..."
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
                {loading ? (
                    <Center h={'100%'}><Loader /></Center>
                )
                    : data.data?.length > 0
                        ? data.data.map((item, index: number) => (
                            <Algorithms {...item} key={index} />
                        ))
                        : (
                            <Card>
                                <Text ta="center" size="sm" c="dimmed">No se encontraron resultados.</Text>
                            </Card>
                        )
                }
            </Panel>
        </Container>
    )
}