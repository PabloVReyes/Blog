import { Box, Center, Checkbox, Divider, Fieldset, Group, Loader, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { ModalButtons } from "@/components";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import classes from "./Form.module.css"
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { fecthPermissions } from "../../api";
import { Alert } from "@/ui";

interface Props {
    form: any;
    onSubmit: (values: any) => void;
    submitLabel: string;
    isLoading?: boolean;
}

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

export const Form = ({ form, onSubmit, submitLabel, isLoading }: Props) => {
    const [permissions, setPermissions] = useState<Data[]>([])
    const [loadingPermissions, setLoadingPermissions] = useState<boolean>(false)

    const fetchPermissionData = async () => {
        setLoadingPermissions(true)
        try {
            const res = await fecthPermissions({})
            setPermissions(res.data)
        } finally {
            setLoadingPermissions(false)
        }
    }

    useEffect(() => {
        if (!permissions.length) return;

        const allSelected =
            form.values.permissions.length === permissions.length;

        form.setFieldValue("fullAccess", allSelected);

    }, [permissions, form.values.permissions]);

    useEffect(() => {
        fetchPermissionData()
    }, [])

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset legend="Información">
                    <TextInput
                        withAsterisk
                        label="Nombre"
                        description="Nombre del permiso"
                        placeholder="Ej. Ver usuarios"
                        maxLength={MAX_TITLE_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.name?.length || 0}/{MAX_TITLE_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("name")}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Descripción"
                        description="Describe qué permite hacer este permiso."
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.description?.length || 0}/{MAX_DESCRIPTION_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("description")}
                        placeholder="Permite ver usuarios"
                    />
                </Fieldset>

                <Fieldset legend="Permisos"
                    style={{
                        borderColor: form.errors.permissions ? 'var(--mantine-color-red-filled)' : 'light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))',
                    }}
                >
                    {loadingPermissions ?
                        <Center h={"100%"}><Loader /></Center>
                        :
                        <>
                            <Checkbox.Card
                                className={`${classes.root} ${form.values.fullAccess ? classes.active : ''}`}
                                radius="md"
                                onClick={() => {
                                    const full = !form.values.fullAccess;

                                    form.setFieldValue("fullAccess", full);

                                    if (full) {
                                        form.setFieldValue(
                                            "permissions",
                                            permissions.map((p) => p.id)
                                        );
                                    } else {
                                        form.setFieldValue("permissions", []);
                                    }
                                }}
                            >
                                <Group wrap="nowrap" align="flex-start">
                                    <Checkbox.Indicator radius={"xs"} checked={form.values.fullAccess} style={{ backgroundColor: form.values.fullAccess ? "" : "transparent" }} />
                                    <div>
                                        <Text className={classes.label}>Acceso Total al Sistema</Text>
                                        <Text className={classes.description} size="sm">Este rol tendrá acceso a todas las funcionalidades sin restricciones</Text>
                                    </div>
                                </Group>
                            </Checkbox.Card>

                            {!form.values.fullAccess && (
                                <>
                                    <Divider />
                                    <Stack>
                                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={5}>
                                            {permissions.length > 0 ? (
                                                permissions.map((permiso, index: number) => {
                                                    const checked = form.values.permissions.includes(permiso.id);

                                                    return (
                                                        <Checkbox.Card
                                                            checked={checked}
                                                            className={`${classes.root} ${checked ? classes.active : ''}`}
                                                            radius="md"
                                                            value={permiso.id}
                                                            key={index}
                                                            onClick={() => {
                                                                const current = form.values.permissions;

                                                                if (checked) {
                                                                    form.setFieldValue(
                                                                        "permissions",
                                                                        current.filter((id: string) => id !== permiso.id)
                                                                    );
                                                                } else {
                                                                    form.setFieldValue("permissions", [...current, permiso.id]);
                                                                }
                                                            }}
                                                        >
                                                            <Group wrap="nowrap" align="flex-start">
                                                                <Checkbox.Indicator radius={"xs"} style={{ backgroundColor: checked ? "" : "transparent" }} />
                                                                <div>
                                                                    <Text className={classes.label}>{permiso.name}</Text>
                                                                    <Text className={classes.description} size="sm">{permiso.description}</Text>
                                                                </div>
                                                            </Group>
                                                        </Checkbox.Card>
                                                    );
                                                })
                                            ) : (
                                                <Box style={{ gridColumn: 'span 2', textAlign: 'center' }} py="xl">
                                                    <Text c="dimmed" fz="sm">No hay permisos disponibles. Crea permisos primero.</Text>
                                                </Box>
                                            )}
                                        </SimpleGrid>
                                        {form.errors.permissions && (
                                            <Text c="red.6" size="xs" mt={8}>
                                                <Group gap={5} align="center">
                                                    <IconAlertCircle size={16} />
                                                    {form.errors.permissions}
                                                </Group>
                                            </Text>
                                        )}
                                        {form.values.permissions.length > 0 && (
                                            <Alert
                                                color="blue"
                                                content={
                                                    <Group gap={5}>
                                                        <IconCircleCheck />
                                                        <Text size="sm"><strong>{form.values.permissions.length}</strong>{form.values.permissions.length === 1 ? " permiso seleccionado" : " permisos seleccionados"}</Text>
                                                    </Group>
                                                }
                                            />
                                        )}
                                    </Stack>
                                </>
                            )}
                        </>
                    }
                </Fieldset >

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />


            </Stack >
        </form >
    )
}