import { Badge, Button, Card, Divider, Flex, Group, Stack, Text, TextInput, ThemeIcon, Title } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"
import { downloadSystem, getSearch } from "@/layout/api"
import styles from "./Search.module.css"
import * as TablerIcons from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/layout/store"

export const Search = () => {
    const [query, setQuery] = useState("")
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate()
    const { closeModal } = useModalStore()

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

    const download = async (id: string) => {
        try {
            const response = await downloadSystem(id)

            const blob = new Blob([response.data], {
                type: "application/pdf",
            });

            const url = window.URL.createObjectURL(blob);

            window.open(url, "_blank");

            // Opcional: liberar memoria después de un tiempo
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);


        } catch (error) {
            console.error("Error al descargar archivo", error);
        }
    };

    const handleNavigate = (type: string, id: string, url?: string) => {
        if (type === "file") {
            download(id)
        } else {
            if (!url) return;

            // externa
            if (url.startsWith("http")) {
                window.open(url, "_blank"); // o window.location.href = url;
            } else {
                // interna SPA
                const newUrl = `/sistemas-de-consulta${url}`
                navigate(newUrl);
            }
        }

        closeModal()
    };

    const items = data.map((search, index) => {
        const Icon =
            search.icon &&
            (TablerIcons as any)[search.icon];

        return (
            <Card
                key={index}
                h={'100%'}
                p={"lg"}
                onClick={() => handleNavigate(search.type, search.id, search.url)}
                style={{
                    cursor: "pointer",
                    position: "relative"
                }}
                className={styles.group}
            >

                <Flex justify="space-between" align="flex-start">
                    <Flex gap="md" align="flex-start" style={{ flex: 1 }}>
                        <ThemeIcon
                            size={56}
                            color={search.color}
                            variant="light"
                            className={`${styles.iconWrapper}`}
                            style={{
                                '--icon-rgb': search.color || "#40c057" // fallback green
                            } as React.CSSProperties}
                        >
                            <Icon size={28} />
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1 }}>
                            <Group gap="sm">
                                <Title order={5}>
                                    {search.acronym &&
                                        `${search.acronym} - `
                                    }
                                    {search.name}</Title>
                                {search.badge &&
                                    <Badge color="red" size="xs">
                                        {search.badge}
                                    </Badge>
                                }
                            </Group>

                            <Text size="sm">
                                {search.description}
                            </Text>
                            <Button
                                mt={"auto"}
                                variant="subtle"
                                px={0}
                                className={styles.action}
                                rightSection={
                                    <TablerIcons.IconArrowNarrowRight
                                        size={20}
                                        className={styles.arrow}
                                    />
                                }
                            >
                                Acceder
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Card>
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