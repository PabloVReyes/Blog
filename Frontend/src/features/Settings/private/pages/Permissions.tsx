import { Container, Panel } from "@/components"
import { useModalStore } from "@/layout"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect, useCallback } from "react"
import { Notify } from "@/ui"
import { Badge, Box, Card, Center, Code, Divider, Group, Loader, SimpleGrid, Stack, Text } from "@mantine/core"
import { IconCircleCheck, IconKey, IconShield, IconXboxX } from "@tabler/icons-react"
import classes from "./Permissions.module.css"
import { ActionsPermissions, AddPermissions } from "../components"
import { useSettingsPermissionsStore } from "@/stores"

// 1. Definición estricta de interfaces (Basada en tu modelo de Prisma)
export interface RoleRole {
    id: string;
    name: string;
    description: string;
}

export interface RoleElement {
    role: RoleRole;
}

export interface Permission {
    id: string;
    name: string;
    key: string;
    description: string;
    active: boolean;
    _count: {
        roles: number;
    };
    roles: RoleElement[];
}

export const Permissions = () => {
    const { openModal } = useModalStore()

    // 2. Extraemos el estado. Forzamos 'items' a Permission[] para evitar el error de mapeo
    const store = useSettingsPermissionsStore()
    const items = store.items as Permission[]

    const {
        fetch, setSearch, search, isLoading, page, limit,
        totalItems, totalPages, setLimit, firstItem, lastItem, setPage
    } = store

    const [debounced] = useDebouncedValue(search, 500)

    // 3. handleFetch envuelto en useCallback para estabilidad de dependencias
    const handleFetch = useCallback(async () => {
        try {
            await fetch?.()
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener permisos",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }, [fetch])

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit, handleFetch])

    const handleAdd = () => {
        openModal({
            title: "Agregar Permiso",
            subtitle: "Agregar un nuevo permiso al sistema",
            icon: "IconPlus",
            content: <AddPermissions />
        })
    }

    return (
        <Container
            title="Gestión de Permisos"
            description="Configuración de permisos de acceso al sistema"
        >
            <Panel
                title
                titleValue="Lista de permisos"
                onAddElement={handleAdd}
                labelAdd="Agregar Permiso"
                search
                searchPlaceholder="Buscar permiso"
                searchValue={search}
                onChangeSearch={setSearch}
                page
                pageValue={page}
                firstItem={firstItem}
                lastItem={lastItem}
                onChangeLimit={setLimit}
                limit
                limitValue={limit}
                totalPages={totalPages}
                totalItems={totalItems}
                onChangePage={setPage}
            >
                {isLoading ? (
                    <Center h={300}>
                        <Loader size="lg" />
                    </Center>
                ) : items.length === 0 ? (
                    <Card withBorder>
                        <Text ta="center" size="sm" c="dimmed">No se encontraron resultados.</Text>
                    </Card>
                ) : (
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
                        {items.map((permiso) => (
                            <Card withBorder shadow="sm" className={classes.card} key={permiso.id}>
                                <Card.Section p="lg">
                                    {/* Header */}
                                    <Group justify="space-between" align="flex-start" mb="md" wrap="nowrap">
                                        <Box>
                                            <Group gap="xs" mb={4} wrap="nowrap">
                                                <IconKey size={20} className={classes.keyIcon} style={{ flex: "0 0 auto" }} />
                                                <Text fw={700} fz="lg" c="bright">
                                                    {permiso.name}
                                                </Text>
                                            </Group>
                                            <Code className={classes.code} fz="xs" px="xs">
                                                {permiso.key}
                                            </Code>
                                        </Box>

                                        {/* Pasamos permiso.key explícitamente si ActionsPermissions lo requiere */}
                                        <ActionsPermissions {...permiso} permissionKey={permiso.key} />
                                    </Group>

                                    {/* Descripción */}
                                    <Text fz="sm" c="dimmed" mb="lg" lineClamp={2} h={40}>
                                        {permiso.description}
                                    </Text>

                                    {/* Estado */}
                                    <Stack gap="xs" mb="lg">
                                        <Group justify="space-between">
                                            <Text fz="xs" c="dimmed">Estado:</Text>
                                            <Group gap={4} align="center">
                                                {permiso.active ? (
                                                    <>
                                                        <IconCircleCheck size={14} color="var(--mantine-color-green-6)" stroke={3} />
                                                        <Text fz="xs" fw={600} c="green.6">Activo</Text>
                                                    </>
                                                ) : (
                                                    <>
                                                        <IconXboxX size={14} color="var(--mantine-color-red-6)" stroke={3} />
                                                        <Text fz="xs" fw={600} c="red.6">Inactivo</Text>
                                                    </>
                                                )}
                                            </Group>
                                        </Group>
                                    </Stack>

                                    <Divider mb="sm" />

                                    {/* Roles asignados */}
                                    <Box>
                                        <Group gap="xs" mb="xs">
                                            <IconShield size={16} color="var(--mantine-color-gray-5)" />
                                            <Text fz="xs" fw={700} c="dimmed" tt="uppercase" lts="1px">
                                                Roles asignados ({permiso._count.roles})
                                            </Text>
                                        </Group>

                                        <Group gap={8}>
                                            {permiso._count.roles === 0 ? (
                                                <Text size="xs" c="dimmed" fs="italic">Sin roles asignados</Text>
                                            ) : (
                                                permiso.roles.map((item) => (
                                                    <Badge
                                                        key={item.role.id}
                                                        radius="sm"
                                                        size="sm"
                                                        variant="light"
                                                    >
                                                        {item.role.name}
                                                    </Badge>
                                                ))
                                            )}
                                        </Group>
                                    </Box>
                                </Card.Section>
                            </Card>
                        ))}
                    </SimpleGrid>
                )}
            </Panel>
        </Container>
    )
}