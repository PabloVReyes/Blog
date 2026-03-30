import { Box, Center, Checkbox, Divider, Fieldset, Group, Loader, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { ModalButtons, Switch } from "@/components";
import { MAX_NAME_PERSON_LENGTH } from "@/constants";
import { useEffect, useState } from "react";
import { IconAlertCircle, IconCircleCheck, IconMail } from "@tabler/icons-react";
import { settingsPermissionsApi, settingsRolesApi } from "../../api";
import classes from "./Form.module.css"
import { Alert, Notify } from "@/ui";
import { type UseFormReturnType } from '@mantine/form'

export interface Data {
    id: string;
    name: string;
    description: string;
    _count: Count;
    permissions: PermissionElement[];
}

interface RoleFormValues {
    name: string
    active: boolean
    roles: string[]
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

interface Props {
    form: UseFormReturnType<RoleFormValues>
    onSubmit: (values: any) => void;
    submitLabel: string;
    isLoading?: boolean;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading }: Props) => {
    const [roles, setRoles] = useState<Data[]>([])
    const [loadingRoles, setLoadingRoles] = useState<boolean>(false)
    const [permissions, setPermissions] = useState<number>(0)

    const fetchRolesData = async () => {
        setLoadingRoles(true)
        try {
            const res = await settingsRolesApi.fetch({})
            setRoles(res.data)
        } finally {
            setLoadingRoles(false)
        }
    }

    const fetchPermissionsData = async () => {
        try {
            const res = await settingsPermissionsApi.fetch({})
            setPermissions(res.meta.total)
        } catch (error) {
            Notify({
                type: "error",
                title: "Error al cargar permisos",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    useEffect(() => {
        fetchPermissionsData()
        fetchRolesData()
    }, [])

    const fullAccessRole = roles.find(
        (r) => r._count.permissions === permissions
    );

    const isAdminSelected = fullAccessRole
        ? form.values.roles.includes(fullAccessRole.id)
        : false;

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset legend="Información">
                    <Switch
                        label="Estado"
                        description='Estado del usuario: Activo/Inactivo'
                        value={form.values.active}
                        {...form.getInputProps("active", { type: "checkbox" })}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Nombre"
                        description="Nombre completo del usuario"
                        placeholder="Ej. Pablo Vazquez Reyes"
                        maxLength={MAX_NAME_PERSON_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.name?.length || 0}/{MAX_NAME_PERSON_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("name")}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Correo Electronico"
                        description="Correo electronico en donde le llegara su contraseña al usuario"
                        leftSection={
                            <IconMail size={16} />
                        }
                        {...form.getInputProps("email")}
                        placeholder="email@example.com"
                    />

                </Fieldset>

                <Fieldset legend="Roles"
                    style={{
                        borderColor: form.errors.roles ? 'var(--mantine-color-red-filled)' : 'light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))',
                    }}
                >
                    {loadingRoles
                        ? <Center h={"100%"}><Loader /></Center>
                        : <Stack>
                            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={5}>
                                {roles.length > 0 ? (
                                    roles.map((rol, index: number) => {
                                        const checked = form.values.roles.includes(rol.id);
                                        return (
                                            <Checkbox.Card
                                                key={index}
                                                checked={checked}
                                                className={`${classes.root} ${checked ? classes.active : ""}`}
                                                radius="md"
                                                value={rol.id}
                                                onClick={() => {
                                                    const current = form.values.roles;
                                                    /**
                                                     * Si selecciona ADMIN
                                                     */
                                                    if (fullAccessRole && rol.id === fullAccessRole.id) {
                                                        if (checked) {
                                                            form.setFieldValue("roles", []);
                                                        } else {
                                                            form.setFieldValue("roles", [fullAccessRole.id]);
                                                        }
                                                        return;
                                                    }
                                                    /**
                                                     * Si selecciona rol normal
                                                     * quitar admin si estaba
                                                     */
                                                    let updated = current.filter(
                                                        (id: string) => id !== fullAccessRole?.id
                                                    );
                                                    if (checked) {
                                                        updated = updated.filter(
                                                            (id: string) => id !== rol.id
                                                        );
                                                    } else {
                                                        updated = [...updated, rol.id];
                                                    }
                                                    form.setFieldValue("roles", updated);
                                                }}
                                            >
                                                <Group wrap="nowrap" align="flex-start">
                                                    <Checkbox.Indicator
                                                        radius="xs"
                                                        checked={checked}
                                                        style={{ backgroundColor: checked ? "" : "transparent" }}
                                                    />
                                                    <div>
                                                        <Text className={classes.label}>
                                                            {rol.name}
                                                        </Text>
                                                        <Text className={classes.description} size="sm">
                                                            {rol.description}
                                                        </Text>
                                                    </div>
                                                </Group>
                                            </Checkbox.Card>
                                        );
                                    })
                                ) : (
                                    <Box
                                        style={{ gridColumn: "span 2", textAlign: "center" }}
                                        py="xl"
                                    >
                                        <Text c="dimmed" fz="sm">
                                            No hay roles disponibles. Crea roles primero.
                                        </Text>
                                    </Box>
                                )}
                            </SimpleGrid>
                            {form.errors.roles && (
                                <Text c="red.6" size="xs" mt={8}>
                                    <Group gap={5} align="center">
                                        <IconAlertCircle size={16} />
                                        {form.errors.roles}
                                    </Group>
                                </Text>
                            )}
                            {form.values.roles.length > 0 && (
                                <Alert
                                    color="blue"
                                    content={
                                        <Group gap={5}>
                                            <IconCircleCheck />
                                            <Text size="sm"><strong>{form.values.roles.length}</strong>{form.values.roles.length === 1 ? " rol seleccionado" : " roles seleccionados"}</Text>
                                        </Group>
                                    }
                                />
                            )}
                            {isAdminSelected && (
                                <Alert
                                    color="yellow"
                                    content={
                                        <Group gap={5} wrap="nowrap">
                                            <IconAlertCircle style={{ flex: "0 0 auto" }} />
                                            <Text size="sm"><strong>Rol con todos los permisos:</strong> Los roles con todos los permisos tienen acceso completo al sistema y no pueden combinarse con otros roles.</Text>
                                        </Group>
                                    }
                                />
                            )}
                        </Stack>
                    }
                </Fieldset>

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    )
}