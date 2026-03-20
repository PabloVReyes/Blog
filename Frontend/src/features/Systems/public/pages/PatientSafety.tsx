import { Container } from "@/components"
import { Alert, Notify } from "@/ui"
import { Loader, Center, Text, Group, Box, Badge, Card, Stack, Button, SimpleGrid, rem, TextInput } from "@mantine/core"
import { useEffect, useState } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { fetchCategoryPatientSafety, fetchPatientSafety } from "../api"
import * as TablerIcons from "@tabler/icons-react"
import classes from "./PatientSafety.module.css"
import { getTablerIcon } from "@/helpers"

const messages = [
    { title: "Emergencias Médicas", content: "Códigos para atención inmediata de situaciones médicas críticas que ponen en riesgo la vida del paciente.", color: "blue" as "blue" | "emerald" | "red" | "yellow" | "orange" | "cyan" },
    { title: "Seguridad Física", content: "Códigos para protección de personas ante amenazas, robos, violencia y situaciones de riesgo físico.", color: "red" as "blue" | "emerald" | "red" | "yellow" | "orange" | "cyan" },
    { title: "Desastres y Evacuación", content: "Códigos para manejo de incendios, desastres naturales y evacuación ordenada del hospital.", color: "emerald" as "blue" | "emerald" | "red" | "yellow" | "orange" | "cyan" },
    { title: "Incidentes", content: "Códigos para manejo de derrames peligrosos y fallas en sistemas críticos del hospital.", color: "orange" as "blue" | "emerald" | "red" | "yellow" | "orange" | "cyan" }
]

interface Zone {
    id: string
    name: string
}

export interface Data {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id: string;
    name: string;
    code: string;
    color: string;
    icon: string;
    description: string;
    categoryCodesId: string;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
}

export interface Category {
    id: string;
    name: string;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}


export const PatientSafety = () => {
    const [data, setData] = useState<Data>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });

    const [categorys, setCategorys] = useState<Zone[]>([]);
    const [search, setSearch] = useState<string>("");
    const [debounced] = useDebouncedValue(search, 500);
    const [loading, setLoading] = useState<boolean>(false);

    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const fetchFilters = async () => {
        try {
            const categorysResp = await fetchCategoryPatientSafety();
            setCategorys(categorysResp.data || []);
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener categorias",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
            setCategorys([]);
        }
    };

    const handleFetch = async (searchValue?: string) => {
        try {
            setLoading(true)

            const response = await fetchPatientSafety({
                search: searchValue,
                categoryId: selectedCategory !== "all" ? selectedCategory : undefined
            });
            setData(response);
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener códigos",
                message: error instanceof Error ? error.message : "Error desconocido"
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
    }, [selectedCategory]);

    useEffect(() => {
        const trimmed = debounced.trim();

        if (debounced && trimmed === "") {
            return;
        }

        handleFetch(trimmed || undefined);
    }, [debounced]);

    return (
        <Container
            title="Seguridad del Paciente"
            description="Códigos Homologados de Seguridad Hospitalaria (CAE)"
        >
            <Alert
                color="red"
                title={
                    <Group align="center" gap="xs" mb="sm" wrap="nowrap">
                        <TablerIcons.IconAlertTriangle color="red" style={{ flex: "0 0 auto" }} />
                        <Text fw={600} fz="lg">
                            Importante: Es responsabilidad de todos conocer cada uno de los Códigos de Seguridad Hospitalaria
                        </Text>
                    </Group>
                }
                content="El objetivo es establecer procedimientos coordinados con el propósito de contar con protocolos para la atención inmediata de situaciones de emergencia y seguridad dentro de las instalaciones del hospital."
            />

            <Card>
                <Group gap="sm">

                    <TextInput
                        w="100%"
                        leftSection={<TablerIcons.IconSearch />}
                        placeholder="Buscar por nombre, descripción..."
                        styles={{
                            input: {
                                backgroundColor:
                                    "light-dark(oklch(98.5% 0.002 247.839), oklch(21% 0.034 264.665))",
                            },
                        }}
                        onChange={(e) => setSearch && setSearch(e.target.value)}
                        value={search}
                    />

                    <Group gap={5} wrap="wrap" style={{ width: "100%" }}>

                        <Button
                            style={{
                                flexGrow: 1,
                                flexBasis: 160,
                                flexShrink: 0
                            }}
                            variant={selectedCategory === "all" ? "filled" : "outline"}
                            onClick={() => setSelectedCategory("all")}
                        >
                            Todos
                        </Button>

                        {categorys.length > 0 && categorys.map((item, index: number) => (
                            <Button
                                key={index}
                                style={{
                                    flexGrow: 1,
                                    flexBasis: 160,
                                    flexShrink: 0
                                }}
                                onClick={() => setSelectedCategory(item.id)}
                                variant={selectedCategory === item.id ? "filled" : "outline"}
                            >
                                {item.name}
                            </Button>
                        ))}

                    </Group>
                </Group>
            </Card>

            {loading
                ? <Center><Loader /></Center>
                :
                <SimpleGrid cols={{ md: 3, sm: 2, xs: 1 }} spacing={"lg"}>
                    {
                        data.data.map((code) => {
                            const Icon = getTablerIcon(code.icon)

                            const isDarkColor = ["NEGRO", "CAFÉ", "MORADO"].includes(code.code);
                            const isLightColor = ["BLANCO", "AMARILLO", "ÁMBAR"].includes(code.code);

                            const textColor =
                                isDarkColor
                                    ? "white"
                                    : isLightColor
                                        ? "oklch(27.8% 0.033 256.848)"
                                        : "white";

                            const badgeBg =
                                isDarkColor
                                    ? "rgba(255,255,255,0.2)"
                                    : isLightColor
                                        ? "rgba(0,0,0,0.2)"
                                        : "rgba(255,255,255,0.2)";

                            return (
                                <Card
                                    withBorder
                                    p={0}
                                    className={classes.card}
                                >
                                    {/* HEADER */}
                                    <Box
                                        h={rem(128)}
                                        pos="relative"
                                        style={{
                                            backgroundColor: code.color,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Icon
                                            style={{
                                                position: "absolute",
                                                width: rem(128),
                                                height: rem(128),
                                                opacity: 0.1,
                                                color: textColor
                                            }}
                                        />

                                        <Stack gap={0} align="center" style={{ position: "relative", zIndex: 10 }}>
                                            <Text
                                                fz="1.5rem"
                                                fw={950}
                                                style={{
                                                    color: textColor,
                                                    letterSpacing: "0.05em",
                                                    WebkitTextStroke: "0.6px currentColor",
                                                    textShadow: "0 0 1px currentColor"
                                                }}
                                            >
                                                CÓDIGO
                                            </Text>
                                            <Text
                                                lh={1.1}
                                                fw={950}
                                                fz="1.875rem"
                                                style={{
                                                    color: textColor,
                                                    letterSpacing: "0.05em",
                                                    WebkitTextStroke: "0.6px currentColor",
                                                    textShadow: "0 0 1px currentColor"
                                                }}
                                            >
                                                {code.code}
                                            </Text>
                                        </Stack>

                                        <Badge
                                            variant="filled"
                                            pos="absolute"
                                            top={8}
                                            right={8}
                                            px={"8px"}
                                            py={4}
                                            style={{
                                                background: "light-dark(rgba(255,255,255,0.9), rgba(17,17,17,0.9))",
                                                color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-3))"
                                            }}
                                        >
                                            {code.category.name}
                                        </Badge>

                                        <Box
                                            pos="absolute"
                                            bottom={8}
                                            left={8}
                                            w={40}
                                            h={40}
                                            style={{
                                                borderRadius: rem(8),
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background: badgeBg
                                            }}
                                        >
                                            <Icon style={{ width: 24, height: 24, color: textColor }} />
                                        </Box>
                                    </Box>

                                    <Box p="md">
                                        <Group align="flex-start" gap="sm" mb="sm">
                                            <Text fw={900} size="lg" style={{
                                            }}>
                                                {code.name}
                                            </Text>
                                        </Group>


                                        {/* Descripción */}
                                        <Box
                                            pt="sm"
                                            style={{
                                                borderTop:
                                                    "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))"
                                            }}
                                        >
                                            <Group align="flex-start" gap={6} wrap="nowrap">
                                                <TablerIcons.IconInfoCircle size={16} style={{ flex: "0 0 auto" }} />
                                                <Text size="sm" c="light-dark(gray.6, gray.4)" style={{ lineHeight: 1.5, flex: 1 }}>
                                                    {code.description}
                                                </Text>
                                            </Group>
                                        </Box>
                                    </Box>
                                </Card>
                            )
                        })
                    }
                </SimpleGrid>
            }


            <SimpleGrid cols={{ md: 2, xs: 1 }}>
                {messages.map((message) => (
                    <Alert
                        color={message.color}
                        title={
                            <Group align="center" gap={0} mb="sm">
                                <TablerIcons.IconPointFilled />
                                <Text fw={600} fz="lg">
                                    {message.title}
                                </Text>
                            </Group>
                        }
                        content={message.content}
                    />
                ))}
            </SimpleGrid>

        </Container >
    )
}