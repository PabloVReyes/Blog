import { Container, Panel } from "@/components"
import { useModalStore } from "@/layout"
import { usePermissionsStore } from "../store"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Badge, Box, Card, Center, Code, Divider, Group, Loader, SimpleGrid, Stack, Text } from "@mantine/core"
import { IconCircleCheck, IconKey, IconShield, IconXboxX } from "@tabler/icons-react"
import classes from "./Permissions.module.css"
import { ActionsPermissions, AddPermissions } from "../components"

export interface Data {
    id: string;
    name: string;
    key: string;
    description: string;
    active: boolean;
    _count: Count;
    roles: RoleElement[];
}

export interface Count {
    roles: number;
}

export interface RoleElement {
    role: RoleRole;
}

export interface RoleRole {
    id: string;
    name: string;
    description: string;
}

export const Permissions = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = usePermissionsStore()
    const [debounced] = useDebouncedValue(search, 500)

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener descargas",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
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
                labelAdd="Agregar permiso"
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
                {isLoading ?
                    <Center h={"100%"}>
                        <Loader />
                    </Center>
                    : items.length < 1 ?
                        <Card>
                            <Text ta="center" size="sm" c="dimmed">No se encontraron resultados.</Text>
                        </Card>
                        : <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                            {items.map((permiso: Data, index: number) => (
                                <Card withBorder shadow="sm" className={classes.card} key={index}>
                                    <Card.Section p="lg">
                                        {/* Header */}
                                        <Group justify="space-between" align="flex-start" mb="md" wrap="nowrap">
                                            <Box>
                                                <Group gap="xs" mb={4}>
                                                    <IconKey size={20} className={classes.keyIcon} />
                                                    <Text fw={700} fz="lg" c="bright">
                                                        {permiso.name}
                                                    </Text>
                                                </Group>
                                                <Code className={classes.code} fz="xs" px="xs">
                                                    {permiso.key}
                                                </Code>
                                            </Box>

                                            <ActionsPermissions  {...permiso} key={index} permissionKey={permiso.key} />
                                        </Group>

                                        {/* Descripción */}
                                        <Text fz="sm" c="dimmed" mb="lg" lineClamp={2}>
                                            {permiso.description}
                                        </Text>

                                        {/* Metadata */}
                                        <Stack gap="xs" mb="lg" justify="center">
                                            <Group justify="space-between">
                                                <Text fz="xs" c="dimmed">Estado:</Text>
                                                {permiso.active ? (
                                                    <Group gap={4} align="center">
                                                        <IconCircleCheck size={14} color="var(--mantine-color-green-6)" stroke={3} />
                                                        <Text fz="xs" fw={600} c="green.6">Activo</Text>
                                                    </Group>
                                                ) : (
                                                    <Group gap={4} align="center">
                                                        <IconXboxX size={14} color="var(--mantine-color-red-6)" stroke={3} />
                                                        <Text fz="xs" fw={600} c="red.6">Inactivo</Text>
                                                    </Group>
                                                )}
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
                                                {permiso._count.roles < 1 ?
                                                    <Text size="sm" c="dimmed">Sin roles</Text>
                                                    : permiso.roles.map((rol, index: number) => (
                                                        <Badge
                                                            key={index}
                                                            radius="sm"
                                                            size="sm"
                                                        >
                                                            {rol.role.name}
                                                        </Badge>
                                                    ))}
                                            </Group>
                                        </Box>
                                    </Card.Section>
                                </Card>
                            ))}
                        </SimpleGrid>
                }
            </Panel>
        </Container>
    )
}