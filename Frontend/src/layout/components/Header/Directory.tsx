import {
    Badge,
    Card,
    Divider,
    Flex,
    Group,
    Stack,
    Text,
    TextInput,
    ThemeIcon,
    Title
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import styles from "./Directory.module.css";
import { mantineColorsRGB } from "@/shared";
import { useEffect, useRef, useState } from "react";
import { getDirectory } from "@/layout/api";

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
        <Card key={`${item.phone}-${index}`} className={styles.group}>
            <Flex justify="space-between" align="flex-start">
                <Flex gap="md" align="flex-start" style={{ flex: 1 }}>
                    <ThemeIcon
                        size={56}
                        color="green"
                        variant="light"
                        style={{
                            '--icon-rgb': mantineColorsRGB["green"] || "22,163,74",
                        } as React.CSSProperties}
                        className={`${styles.itemIcon} ${styles.iconWrapper}`}
                    >
                        <Text fw={700}>{item.phone}</Text>
                    </ThemeIcon>

                    <Stack gap={4} style={{ flex: 1 }}>
                        <Group gap="sm">
                            <Title order={5} mt={10}>{item.name}</Title>

                            {item.level && (
                                <Badge color="red" size="xs" className={styles.rating}>
                                    {item.level}
                                </Badge>
                            )}
                        </Group>

                        {item.boss && (
                            <Text size="sm" c="gray.7">
                                <Text span c="green" fw={700}>Jefe(a):</Text> {item.boss}
                            </Text>
                        )}

                        {item.secretary && (
                            <Text size="sm" c="gray.7">
                                <Text span c="green" fw={700}>Secretario(a):</Text> {item.secretary}
                            </Text>
                        )}

                        {item.email && (
                            <Text size="sm" c="gray.7">
                                <Text span c="green" fw={700}>Correo electrónico:</Text> {item.email}
                            </Text>
                        )}
                    </Stack>
                </Flex>
            </Flex>
        </Card>
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
