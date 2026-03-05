import {
    Badge,
    Button,
    Card,
    Divider,
    Flex,
    Group,
    Stack,
    Text,
    TextInput,
    ThemeIcon,
    Title
} from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"
import { downloadSystem, getSearch } from "@/layout/api"
import styles from "./Search.module.css"
import * as TablerIcons from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { useModalStore } from "@/layout/store"

export const Search = () => {
    const [query, setQuery] = useState("")
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    const navigate = useNavigate()
    const { closeModal } = useModalStore()

    const loaderRef = useRef<HTMLDivElement | null>(null)
    const isFetchingRef = useRef(false)
    const debounceRef = useRef<NodeJS.Timeout | null>(null)

    // ==============================
    // FETCH CONTROLADO
    // ==============================
    const fetchPage = async (pageToLoad: number, reset = false) => {
        if (isFetchingRef.current) return

        isFetchingRef.current = true
        setLoading(true)

        try {
            const result = await getSearch({
                page: pageToLoad,
                limit: 10,
                search: query,
            })

            const newData = result.data || []
            setTotal(result.total || 0)

            setData(prev => {
                if (reset) return newData

                // 🔥 Evitar duplicados por ID
                const ids = new Set(prev.map(i => i.id))
                const filtered = newData.filter((i: any) => !ids.has(i.id))

                return [...prev, ...filtered]
            })

            setPage(pageToLoad + 1)
        } catch (error) {
            console.error("Error en búsqueda:", error)
        } finally {
            isFetchingRef.current = false
            setLoading(false)
        }
    }

    // ==============================
    // CARGA INICIAL
    // ==============================
    useEffect(() => {
        fetchPage(1, true)
    }, [])

    // ==============================
    // RESET CON DEBOUNCE
    // ==============================
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(() => {
            setData([])
            setPage(1)
            fetchPage(1, true)
        }, 300)

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }
        }
    }, [query])

    // ==============================
    // INFINITE SCROLL ESTABLE
    // ==============================
    useEffect(() => {
        if (!loaderRef.current) return
        if (data.length >= total) return

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    fetchPage(page)
                }
            },
            { rootMargin: "150px" }
        )

        observer.observe(loaderRef.current)

        return () => observer.disconnect()
    }, [page, total, data.length])

    // ==============================
    // DESCARGA
    // ==============================
    const download = async (id: string) => {
        try {
            const response = await downloadSystem(id)

            const blob = new Blob([response.data], {
                type: "application/pdf",
            })

            const url = window.URL.createObjectURL(blob)
            window.open(url, "_blank")

            setTimeout(() => {
                window.URL.revokeObjectURL(url)
            }, 1000)
        } catch (error) {
            console.error("Error al descargar archivo", error)
        }
    }

    // ==============================
    // NAVEGACIÓN
    // ==============================
    const handleNavigate = (type: string, id: string, url?: string) => {
        if (type === "file") {
            download(id)
        } else {
            if (!url) return

            if (url.startsWith("http")) {
                window.open(url, "_blank")
            } else {
                navigate(`/sistemas-de-consulta${url}`)
            }
        }

        closeModal()
    }

    // ==============================
    // RENDER ITEMS
    // ==============================
    const items = data.map((search) => {
        const Icon =
            search.icon &&
            (TablerIcons as any)[search.icon]

        return (
            <Card
                key={search.id} // ✅ nunca usar index
                h="100%"
                p="lg"
                onClick={() => handleNavigate(search.type, search.id, search.url)}
                style={{ cursor: "pointer", position: "relative" }}
                className={styles.group}
            >
                <Flex justify="space-between" align="flex-start">
                    <Flex gap="md" align="flex-start" style={{ flex: 1 }}>
                        <ThemeIcon
                            size={56}
                            color={search.color}
                            variant="light"
                            className={styles.iconWrapper}
                            style={{
                                '--icon-rgb': search.color || "#40c057"
                            } as React.CSSProperties}
                        >
                            {Icon && <Icon size={28} />}
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1 }}>
                            <Group gap="sm">
                                <Title order={5}>
                                    {search.acronym && `${search.acronym} - `}
                                    {search.name}
                                </Title>

                                {search.badge && (
                                    <Badge
                                        color="red"
                                        size="xs"
                                        variant="filled"
                                    >
                                        {search.badge}
                                    </Badge>
                                )}
                            </Group>

                            <Text size="sm">
                                {search.description}
                            </Text>

                            <Button
                                mt="auto"
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

    // ==============================
    // UI
    // ==============================
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

            {data.length < total && (
                <div ref={loaderRef} style={{ height: 1 }} />
            )}

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