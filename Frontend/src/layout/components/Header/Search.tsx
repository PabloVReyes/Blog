import { Divider, Stack, Text, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"
import { getSearch } from "@/layout/api"
import { Card } from "@/components"

export const Search = () => {
    const [query, setQuery] = useState("")
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    const fetchPage = async (pageToLoad: number, reset = false) => {
        if (loading) return;

        setLoading(true);

        const result = await getSearch({
            page: pageToLoad,
            limit: 10,
            search: query,
        });

        if (reset) {
            setData(result);
        } else {
            setData((prev) => [...prev, ...result]);
        }

        setHasMore(result.length > 0);
        setPage(pageToLoad + 1);

        setLoading(false);
    };

    // ====== Carga inicial ======
    useEffect(() => {
        fetchPage(1, true);
    }, []);

    // ====== Reset cuando cambia búsqueda ======
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPage(1);
            setHasMore(true);
            fetchPage(1, true);
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    // ====== Infinite scroll ======
    useEffect(() => {
        if (!hasMore || loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchPage(page);
                }
            },
            { rootMargin: "100px" } // carga un poco antes de llegar al fondo
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [page, hasMore, loading]);

    const items = data.map((search, index) => {
        return (
            <Card
                key={index}
                type="system"
                variant="horizontal"
                submitLabel="Acceder"
                {...search}
            />
        )
    })

    return (
        <Stack>
            <TextInput
                leftSection={
                    <IconSearch />
                }
                value={query}
                placeholder="Buscar"
                onChange={(e) => setQuery(e.currentTarget.value)}
                styles={{
                    input: {
                        border: "none",
                        fontSize: "18px",
                        backgroundColor: "transparent",
                        '&:focus': {
                            outline: "none",
                            boxShadow: "none",
                        },
                    },
                }}

            />
            <Divider />
            {items}
            {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}

            {loading && (
                <Text size="sm" c="dimmed" ta="center">
                    Cargando más resultados...
                </Text>
            )}

            {!loading && data.length === 0 && (
                <Text size="sm" c="dimmed" ta="center">
                    No se encontraron resultados
                </Text>
            )}
        </Stack>
    )
}