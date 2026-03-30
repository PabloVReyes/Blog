import { Container, Panel } from "@/components"
import { Notify } from "@/ui"
import { Loader, Center, Text, Accordion, Group, ThemeIcon, Box, Badge, Card, Stack, Button, useMantineTheme, Select } from "@mantine/core"
import { useEffect, useState } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { fetchAgreementPerson, fetchGroups, fetchZones } from "../api"
import { IconUser, IconUsers } from "@tabler/icons-react"
import styles from "./AgreementPerson.module.css"
import { colorMap, Highlight } from "@/utils"
import * as types from "../types/AgreementPerson"

export const AgreementPerson = () => {
    const theme = useMantineTheme();

    const [data, setData] = useState<types.Data>({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0, firstItem: 0, lastItem: 0 },
    });

    const [groups, setGroups] = useState<types.Group[]>([]);
    const [zones, setZones] = useState<types.Zone[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [search, setSearch] = useState<string>("");
    const [debounced] = useDebouncedValue(search, 500);
    const [openedItems, setOpenedItems] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [selectedGroup, setSelectedGroup] = useState<string>("all");
    const [selectedZone, setSelectedZone] = useState<string>("all");

    // Traer grupos y zonas
    const fetchFilters = async () => {
        try {
            const groupsResp = await fetchGroups();
            const zonesResp = await fetchZones();

            setGroups(groupsResp.data || []);
            setZones(zonesResp.data || []);
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener filtros",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
            setGroups([]);
            setZones([]);
        }
    };

    const handleFetch = async (searchValue?: string) => {
        try {
            setLoading(true)

            const response = await fetchAgreementPerson({
                page,
                limit,
                search: searchValue,
                groupId: selectedGroup !== "all" ? selectedGroup : undefined,
                zoneId: selectedZone !== "all" ? selectedZone : undefined,
            });
            setData(response);

            if (search) {
                const searchLower = search.toLowerCase();
                const expandIds = response.data
                    .filter(
                        (person: types.Datum) =>
                            person.name.toLowerCase().includes(searchLower) ||
                            person.dependents.some((dep: types.Dependent) => dep.name.toLowerCase().includes(searchLower))
                    )
                    .map((person: types.Datum) => person.id.toString());

                setOpenedItems(expandIds);
            } else {
                setOpenedItems([]);
            }
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener datos",
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
        setOpenedItems([]);
    }, [limit, page, selectedGroup, selectedZone]);

    useEffect(() => {
        const trimmed = debounced.trim();

        setPage(1);
        setOpenedItems([]);

        if (debounced && trimmed === "") {
            return;
        }

        handleFetch(trimmed || undefined);
    }, [debounced]);

    const toggleAll = () => {
        if (openedItems.length === data.data.length) {
            setOpenedItems([]);
        } else {
            const allIds = data.data.map((item) => item.id.toString());
            setOpenedItems(allIds);
        }
    };

    return (
        <Container
            title="Pacientes de Convenio"
            description="Lista de pacientes de convenio titulares y dependientes"
        >
            <Panel
                search
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar por número de titular, nombre, grupo o zona..."
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
                    <Group justify="space-between">
                        <Button
                            w={{ base: "100%", sm: 150 }}
                            variant="subtle"
                            size="xs"
                            onClick={toggleAll}
                        >
                            {openedItems.length === data.data.length ? "Contraer todo" : "Expandir todo"}
                        </Button>
                        <Group w={{ base: "100%", sm: 416 }}>
                            <Select
                                value={selectedGroup}
                                onChange={(val) => setSelectedGroup(val || "all")}
                                data={[
                                    { value: "all", label: "Todos los grupos" },
                                    ...groups.map((g) => ({ value: g.id.toString(), label: g.name })),
                                ]}
                                placeholder="Filtrar por grupo"
                                w={{ base: "100%", sm: 200 }}
                            />
                            <Select
                                value={selectedZone}
                                onChange={(val) => setSelectedZone(val || "all")}
                                data={[
                                    { value: "all", label: "Todas las zonas" },
                                    ...zones.map((z) => ({ value: z.id.toString(), label: z.name })),
                                ]}
                                placeholder="Filtrar por zona"
                                w={{ base: "100%", sm: 200 }}
                            />
                        </Group>
                    </Group>
                </Card>
                {loading ? (
                    <Center h={"100%"}><Loader /></Center>
                ) : data.data?.length > 0 ? (
                    <Stack>
                        <Accordion
                            multiple
                            variant="separated"
                            chevronPosition="left"
                            value={openedItems}
                            onChange={setOpenedItems}
                        >
                            {data.data.map((item) => {
                                const disabled = item.dependents.length === 0

                                return (
                                    <Accordion.Item key={item.id} value={`${item.id}`} className={styles.accordionItem}>
                                        <Accordion.Control chevron={disabled} className={styles.accordionControl}>
                                            <Group wrap="nowrap" gap={"sm"} align="center">
                                                {item.dependents.length > 0 ? (
                                                    <></> /* aquí Mantine coloca el chevron automáticamente */
                                                ) : (
                                                    <Box className="chevron-placeholder" />
                                                )}
                                                <ThemeIcon variant="light" radius="xl" size="lg"
                                                    className={styles.iconWrapper}
                                                    style={{
                                                        '--icon-rgb': `${colorMap[theme.primaryColor]}` || "#40c057" // fallback green
                                                    } as React.CSSProperties}
                                                >
                                                    <IconUser size={20} />
                                                </ThemeIcon>
                                                <Box style={{ flex: 1 }}>
                                                    <Group
                                                        gap={"xl"}
                                                        justify="flex-start"
                                                        wrap="wrap"
                                                    >
                                                        <Box>
                                                            <Text size="xs" c="dimmed" mb={"4px"} fw={700}>No. Titular</Text>
                                                            <Text fw={600}>{item.id}</Text>
                                                        </Box>
                                                        <Box flex={1} ml="md" style={{ flex: 1, minWidth: 150 }}>
                                                            <Text size="xs" c="dimmed" mb={"4px"} fw={700}>Nombre Completo</Text>
                                                            <Text fw={500}><Highlight text={item.name} query={search} /></Text>
                                                        </Box>
                                                        <Box>
                                                            <Text size="xs" c="dimmed" mb={"4px"} fw={700}>Grupo / Zona</Text>
                                                            <Text size="sm">{item.group.name}</Text>
                                                            <Text size="xs" c="dimmed" mt={"4px"} fw={700}>{item.zone.name}</Text>
                                                        </Box>
                                                    </Group>
                                                </Box>
                                                <Badge
                                                    color="grape"
                                                    variant="light"
                                                    leftSection={<IconUsers size={12} />}
                                                    className={styles.iconWrapper}
                                                    style={{
                                                        '--icon-rgb': `${"#be4bdb"}` || "#40c057" // fallback green
                                                    } as React.CSSProperties}
                                                >
                                                    {item.dependents.length}
                                                </Badge>
                                            </Group>
                                        </Accordion.Control>

                                        {item.dependents.map((dep) => (
                                            <Accordion.Panel className={styles.accordionPanel} key={dep.id}>
                                                <Group
                                                    key={dep.id}
                                                    p="md"
                                                    wrap="nowrap"
                                                >
                                                    <ThemeIcon color="grape" variant="light" size="md" radius="xl"
                                                        className={styles.iconWrapper}
                                                        style={{
                                                            '--icon-rgb': `${"#be4bdb"}` || "#40c057" // fallback green
                                                        } as React.CSSProperties}
                                                    >
                                                        <IconUser size={14} />
                                                    </ThemeIcon>
                                                    <Box w={100}>
                                                        <Text size="xs" c="dimmed" fw={700} mb={"4px"}>No. Dependiente</Text>
                                                        <Text size="sm" fw={600} c="grape">{dep.id}</Text>
                                                    </Box>
                                                    <Box>
                                                        <Text size="xs" c="dimmed" fw={700} mb={"4px"}>Nombre Completo</Text>
                                                        <Text size="sm" fw={500}>
                                                            <Highlight query={search} text={dep.name} />
                                                        </Text>
                                                    </Box>
                                                </Group>
                                            </Accordion.Panel>
                                        ))}
                                    </Accordion.Item>
                                )
                            })}
                        </Accordion>
                    </Stack>
                ) : (
                    <Card>
                        <Text ta="center" c="dimmed" size="sm">No se encontraron resultados.</Text>
                    </Card>
                )}
            </Panel>
        </Container >
    )
}