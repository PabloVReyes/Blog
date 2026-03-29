import { Container, Panel, Table } from "@/components";
import { useModalStore } from "@/layout";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect } from "react";
import { Notify } from "@/ui";
import { Avatar, Badge, Box, Group, Text, useMantineTheme } from "@mantine/core";
import { IconCircleCheck, IconMail, IconShieldFilled, IconXboxX } from "@tabler/icons-react";
import classes from "./Users.module.css"
import { formatLocalDate } from "@/utils";
import { ActionsUsers, AddUsers } from "../components";
import { useSettingsUsersStore } from "@/stores";
import type { Column } from "@/types";
import type { UsersData } from "../types/users.types";

const columns = (primaryColor: string): Column<UsersData>[] => [
    {
        key: 'user',
        label: 'Usuario',
        align: 'left',
        render: (row) => {
            return (
                <Group gap="sm" wrap="nowrap">
                    <Avatar radius="xl" alt={row.name} name={row.name} color={primaryColor} variant="filled" />
                    <Box>
                        <Text fw={500} size="sm" lh={1.2} c="bright">
                            {row.name}
                        </Text>

                        <Group gap={4} mt={2}>
                            <IconMail size={12} className={classes.dimmedIcon} />
                            <Text size="xs" c="dimmed">
                                {row.email}
                            </Text>
                        </Group>
                    </Box>
                </Group>
            )
        }
    },
    {
        key: 'roles',
        label: 'Roles',
        align: 'center',
        render: (row) => {
            if (!row.roles) {
                return <Text size="xs" c="dimmed">Sin roles</Text>
            }

            return (
                <Group justify="center" gap={5}>
                    {row.roles.map((role) => (
                        <Badge
                            size="sm"
                            radius="xl"
                            leftSection={<IconShieldFilled size={12} />}
                            className={classes.roleBadge}
                            variant="filled"
                        >
                            {role.role.name}
                        </Badge>
                    ))}
                </Group>
            )
        }
    },
    {
        key: 'isActive',
        label: 'Estado',
        align: 'center',
        render: (row) => {
            if (row.active === true) {
                return (
                    <Badge
                        size="sm"
                        radius="xl"
                        variant="light"
                        color="green"
                        leftSection={<IconCircleCheck size={12} />}
                    >
                        ACTIVO
                    </Badge>
                )
            } else {
                return (
                    <Badge
                        size="sm"
                        radius="xl"
                        color="red"
                        variant="light"
                        leftSection={<IconXboxX size={12} />}
                    >
                        INACTIVO
                    </Badge>
                )
            }
        }
    },
    {
        key: 'lastLoginAt',
        label: 'Ultimo acceso',
        align: 'left',
        render: (row) => {
            if (!row.lastLoginAt) {
                return <Text size="xs" c="dimmed">Aún no ha iniciado sesión</Text>
            }

            return (
                <Text size="sm">{formatLocalDate(row.lastLoginAt)}</Text>
            )
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row) => {
            return <ActionsUsers {...row} />
        }
    },
]


export const Users = () => {
    const { openModal } = useModalStore()
    const { primaryColor } = useMantineTheme()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useSettingsUsersStore()
    const [debounced] = useDebouncedValue(search, 500)

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener usuarios",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    const handleAdd = () => {
        openModal({
            title: "Agregar Usuario",
            subtitle: "Agregar un nuevo usuario al sistema",
            icon: "IconPlus",
            content: <AddUsers />
        })
    }


    return (
        <Container
            title="Gestión de Usuarios"
            description="Administración de cuentas de usuario del sistema"
        >
            <Panel
                title
                titleValue="Lista de usuarios"
                onAddElement={handleAdd}
                labelAdd="Agregar Usuario"
                search
                searchPlaceholder="Buscar usuario..."
                searchValue={search}
                onChangeSearch={setSearch}
                page
                pageValue={page}
                totalPages={totalPages}
                totalItems={totalItems}
                firstItem={firstItem}
                lastItem={lastItem}
                limit
                limitValue={limit}
                onChangeLimit={setLimit}
                onChangePage={setPage}
            >
                <Table
                    isLoading={isLoading}
                    data={items}
                    columns={columns(primaryColor)}
                />
            </Panel>
        </Container>
    );
};