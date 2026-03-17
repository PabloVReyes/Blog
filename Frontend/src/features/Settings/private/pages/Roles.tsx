import { Container, Panel } from "@/components"
import { useModalStore } from "@/layout"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Box, Card, Center, Divider, Group, Loader, SimpleGrid, Text } from "@mantine/core"
import { IconCircleCheck, IconKey, IconShield, IconUsers } from "@tabler/icons-react"
import classes from "./Permissions.module.css"
import { ActionsRoles, AddRoles } from "../components"
import { useSettingsRolesStore } from "@/stores"

export interface Data {
    id: string;
    name: string;
    description: string;
    _count: Count;
    permissions: PermissionElement[];
}

export interface Count {
    users: number;
    permissions: number;
}

export interface PermissionElement {
    permission: PermissionPermission;
}

export interface PermissionPermission {
    id: string;
    name: string;
    key: string;
    description: string;
    active: boolean;
}

export const Roles = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useSettingsRolesStore()
    const [debounced] = useDebouncedValue(search, 500)

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch?.()
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
            content: <AddRoles />
        })
    }

    return (
        <Container
            title="Gestión de Roles"
            description="Administración de roles y jerarquías del personal"
        >
            <Panel
                title
                titleValue="Lista de roles"
                onAddElement={handleAdd}
                labelAdd="Agregar Rol"
                search
                searchPlaceholder="Buscar rol"
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
                            {items.map((rol: any, index: number) => (
                                <Card withBorder shadow="sm" className={classes.card} key={index}>
                                    <Card.Section withBorder>
                                        {/* Header */}
                                        <Group justify="space-between" align="flex-start" mb="md" wrap="nowrap">
                                            <Box>
                                                <Group gap="xs" mb={4}>
                                                    <IconShield size={20} className={classes.keyIcon} />
                                                    <Text fw={700} fz="lg" c="bright">
                                                        {rol.name}
                                                    </Text>
                                                </Group>
                                            </Box>

                                            <ActionsRoles  {...rol} key={index} />
                                        </Group>

                                        {/* Descripción */}
                                        <Text fz="sm" c="dimmed" lineClamp={2}>
                                            {rol.description}
                                        </Text>
                                    </Card.Section>
                                    <Card.Section>
                                        <Group gap="xs" mb={4}>
                                            <IconUsers size={20} className={classes.keyIcon} />

                                            <Text size="sm">
                                                <Text fw={700} fz="lg" c="bright" span>
                                                    {`${rol._count.users} `}
                                                </Text>
                                                {rol._count.users === 1
                                                    ? "usuario asginado"
                                                    : "usuarios asignados"
                                                }
                                            </Text>
                                        </Group>

                                        <Divider mb="sm" />

                                        {/* Roles asignados */}
                                        <Box>
                                            <Group gap="xs" mb="xs">
                                                <IconKey size={16} color="var(--mantine-color-gray-5)" />
                                                <Text fz="xs" fw={700} c="dimmed" tt="uppercase" lts="1px">
                                                    permisos ({rol._count.permissions})
                                                </Text>
                                            </Group>

                                            <Box ml={25}>
                                                {rol._count.permissions < 1 ? (
                                                    <Text size="xs" c="dimmed">Sin permisos</Text>
                                                ) : (
                                                    <>
                                                        {rol.permissions.slice(0, 3).map((permission: any, index: number) => (
                                                            <Group key={index} gap="xs" mb={4}>
                                                                <IconCircleCheck size={16} className={classes.keyIcon} />
                                                                <Text size="sm">
                                                                    {permission.permission.name}
                                                                </Text>
                                                            </Group>
                                                        ))}

                                                        {rol.permissions.length > 3 && (
                                                            <Text size="xs" c="dimmed">
                                                                +{rol.permissions.length - 3} permiso{rol.permissions.length - 3 > 1 ? "s" : ""} más
                                                            </Text>
                                                        )}
                                                    </>
                                                )}
                                            </Box>
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