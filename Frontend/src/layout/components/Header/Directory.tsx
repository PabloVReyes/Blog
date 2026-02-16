import {
    Divider,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { getDirectory } from "@/layout/api";
import { Card } from "@/components";

export const Directory = () => {
    const [query, setQuery] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    // ====== Cargar página específica ======
    const fetchPage = async (pageToLoad: number, reset = false) => {
        if (loading) return;

        setLoading(true);

        const result = await getDirectory({
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

    const items = data.map((item, index) => (
        <Card
            key={index}
            card="directory"
            level={item.level}
            phone={item.phone}
            name={item.name}
            boss={item.boss}
            secretary={item.secretary}
            email={item.email}
        />
    ));

    return (
        <Stack>
            <TextInput
                leftSection={<IconSearch />}
                value={query}
                placeholder="Buscar"
                onChange={(e) => setQuery(e.currentTarget.value)}
                styles={{
                    input: {
                        backgroundColor: "transparent",
                        border: "none",
                        fontSize: "18px",
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
    );
};
