import { Badge, Button, Card, Divider, Flex, Group, Stack, Text, TextInput, ThemeIcon, Title } from "@mantine/core"
import { IconArrowNarrowRight, IconSearch } from "@tabler/icons-react"
import { searchsItems } from "./searchs"
import styles from "./Search.module.css"
import { mantineColorsRGB } from "@/shared"
import { useMemo, useState } from "react"

export const Search = () => {
    const [query, setQuery] = useState("")

    const filteredItems = useMemo(() => {
        const q = query.trim().toLowerCase();

        // Sin búsqueda → primeros 6
        if (!q) {
            return searchsItems.slice(0, 4);
        }

        // Con búsqueda → filtrar y limitar a 6
        return searchsItems
            .filter((item) =>
                item.title.toLowerCase().includes(q)
            )
            .slice(0, 4);
    }, [query]);

    const items = filteredItems.map((search) => {
        if (!filteredItems) {
            return (
                <Text size="sm" c="dimmed">
                    No se encontraron resultados
                </Text>
            )
        }

        return (
            <Card
                className={styles.group}
            >
                <Flex justify="space-between" align="flex-start">
                    <Flex gap="md" align="flex-start" style={{ flex: 1 }}>
                        <ThemeIcon
                            size={56}
                            color="green"
                            variant="light"
                            style={{
                                '--icon-rgb': mantineColorsRGB[search.color] || "22,163,74" // fallback green
                            } as React.CSSProperties}
                            className={`${styles.itemIcon} ${styles.iconWrapper}`}

                        >
                            <search.icon size={28} />
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1 }}>
                            <Group gap="sm">
                                <Title order={5}>{search.title}</Title>
                                {search.badge &&
                                    <Badge color="red" size="xs">
                                        {search.badge}
                                    </Badge>
                                }
                            </Group>

                            <Text size="sm" c="gray.7">
                                {search.description}
                            </Text>

                            <Button
                                mt={"auto"}
                                variant="subtle"
                                color="green"
                                px={0}
                                className={styles.action}
                                rightSection={
                                    <IconArrowNarrowRight
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
                        '&:focus': {
                            outline: "none",
                            boxShadow: "none",
                        },
                    },
                }}

            />
            <Divider />
            {items}
            {query.trim() && filteredItems.length === 0 && (
                <Text size="sm" c="dimmed" ta="center">
                    No se encontraron resultados
                </Text>
            )}

        </Stack>
    )
}