import { Container } from "@/components"
import { Badge, Button, Card, Center, Flex, Loader, ScrollArea, Stack, Text, TextInput, Title } from "@mantine/core";
import { IconFileText, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { MonthyReport } from "../components";
import dayjs from "dayjs";
import { fetchMonthlyReports, fetchPeriods } from "../api";
import { Notify } from "@/ui";
import { useDebouncedValue } from "@mantine/hooks";
import type { MonthlyReportsData } from "../../types/monthlyReports.types";

export interface ReportsResponse {
    data: MonthlyReportsData[];
    meta: Meta;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface Priod {
    id: string;
    year: number;
    _count: {
        reports: number
    }
}

export const MonthlyReports = () => {
    const [loadingPeriods, setLoadingPeriods] = useState<boolean>(false)
    const [loadingReports, setLoadinReports] = useState<boolean>(false)
    const [periods, setPeriods] = useState<Priod[]>([])
    const [reportsResponse, setReportsResponse] = useState<ReportsResponse | null>(null)
    const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debounced] = useDebouncedValue(searchTerm, 500)

    const reports = reportsResponse?.data ?? []
    const total = reportsResponse?.meta?.total ?? 0

    useEffect(() => {
        const fetchPeriodsData = async () => {
            try {
                setLoadingPeriods(true);

                const periodsRes = await fetchPeriods();
                setPeriods(periodsRes);

                if (periodsRes.length > 0) {
                    setSelectedPeriod(periodsRes[0].year);
                } else {
                    setSelectedPeriod(Number(dayjs().format("YYYY")));
                }

            } catch (error: unknown) {
                Notify({
                    type: "error",
                    title: "Error al obtener periodos",
                    message: error instanceof Error ? error.message : "Error desconocido"
                });
            } finally {
                setLoadingPeriods(false);
            }
        };

        fetchPeriodsData();
    }, []);

    useEffect(() => {
        if (!selectedPeriod) return;

        const fetchReportsData = async () => {
            try {
                setLoadinReports(true);

                const reportsRes = await fetchMonthlyReports(selectedPeriod, searchTerm);
                setReportsResponse(reportsRes);

            } catch (error: unknown) {
                Notify({
                    type: "error",
                    title: "Error al obtener informes mensuales",
                    message: error instanceof Error ? error.message : "Error desconocido"
                });
            } finally {
                setLoadinReports(false);
            }
        };

        fetchReportsData();
    }, [selectedPeriod, debounced]);

    return (
        <Container
            title="Informes Mensuales"
            description="Informes mensuales de los resultados de alcance de metas e indicadores de productividad y desempeño"
        >
            <Flex
                gap="lg"
                align="flex-start"
                direction={{ base: "column", md: "row" }}
            >
                {/* Sidebar */}
                <Card
                    w={{ base: "100%", md: 260 }}
                    mah={{ base: "auto", md: "100dvh" }}
                >
                    {/* Header */}
                    <Card.Section
                        withBorder
                        h={60}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            background: "light-dark(#f9fafb,rgba(17,24,39,0.5))",
                        }}
                    >
                        <Title order={3}>Periodo</Title>
                    </Card.Section>

                    {/* Content */}
                    <ScrollArea
                        pt={10}
                        mah={{ base: 200, md: "calc(100dvh - 60px)" }}
                    >
                        <Stack gap={5} style={{ textAlign: "center" }}>
                            {loadingPeriods
                                ? (
                                    <Center>
                                        <Loader />
                                    </Center>
                                )
                                : periods.length < 1
                                    ? <Text size="sm" c="dimmed">
                                        No se encontraron periodos
                                    </Text>
                                    : periods.map((period) => {
                                        const active = selectedPeriod === period.year;

                                        return (
                                            <Button
                                                key={period.id}
                                                justify="space-between"
                                                variant={active ? "filled" : "light"}
                                                fullWidth
                                                onClick={() => {
                                                    setSelectedPeriod(period.year);
                                                    setSearchTerm("");
                                                }}
                                                leftSection={<IconFileText size={18} />}
                                                rightSection={
                                                    <Badge
                                                        variant={active ? "white" : "filled"}
                                                    >
                                                        {period._count?.reports ?? 0}
                                                    </Badge>
                                                }
                                            >
                                                Año {period.year}
                                            </Button>
                                        );
                                    })}
                        </Stack>
                    </ScrollArea>
                </Card>

                {/* Content */}
                <Stack flex={1} gap="md" w={"100%"}>
                    {/* Search Bar */}
                    <Card>
                        <Flex
                            justify="space-between"
                            direction={{ base: "column", sm: "row" }}
                            gap="md"
                            style={{ alignItems: "center" }}
                        >
                            <TextInput
                                placeholder="Buscar informes..."
                                leftSection={<IconSearch size={18} />}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                w={{ base: "100%", sm: 300 }}
                                styles={{
                                    input: {
                                        background:
                                            "light-dark(oklch(98.5% 0.002 247.839), oklch(21% 0.034 264.665))",
                                    },
                                }}
                            />

                            <Text
                                ta={{ base: "center", sm: "left" }}
                                size="sm"
                                style={{ color: "light-dark(oklch(44.6% 0.03 256.802), oklch(70.7% 0.022 261.325))" }}
                            >
                                {total} {total === 1 ? "informe disponible" : "informes disponibles"}
                            </Text>
                        </Flex>
                    </Card>

                    {loadingReports
                        ? (
                            <Center h={"100%"}>
                                <Loader />
                            </Center>
                        )
                        : reports.length < 1
                            ? <Card>
                                <Text
                                    size="sm"
                                    c="dimmed"
                                    ta={"center"}
                                >
                                    No se encontraron resultados
                                </Text>
                            </Card>
                            : reports.map((report) => (
                                <MonthyReport {...report} key={report.id} />
                            ))
                    }
                </Stack>
            </Flex>
        </Container>
    )
}

