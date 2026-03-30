import { Divider, Fieldset, Select, Stack, Text, TextInput } from "@mantine/core";
import { ModalButtons } from "@/components";
import { MAX_NAME_PERSON_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { useEffect, useState } from "react";
import { fetchLevels } from "../api";
import { Notify } from "@/ui";
import { type UseFormReturnType } from "@mantine/form";

export interface DirectoryFormValues {
    phone: string;
    name: string;
    level: string;
    boss: string;
    secretary: string;
    email: string;
}

interface Props {
    // Tipamos el formulario de Mantine
    form: UseFormReturnType<DirectoryFormValues>;
    onSubmit: (values: DirectoryFormValues) => void;
    submitLabel: string;
    isLoading?: boolean;
}

interface Level {
    id: string | number;
    name: string;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading }: Props) => {
    const [levels, setLevents] = useState<Level[]>([])

    const fetchLevelsData = async () => {
        try {
            const areasResp = await fetchLevels()
            setLevents(areasResp.data || [])
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener niveles",
                message: error instanceof Error ? error.message : "Error desconocido"
            });
            setLevents([])
        }
    }

    useEffect(() => {
        fetchLevelsData();
    }, []);

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset legend="Información">
                    <TextInput
                        withAsterisk
                        label="Extención"
                        description="Extención Telefonica"
                        placeholder="1035"
                        maxLength={4}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.phone?.length || 0}/{4}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("phone")}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Nombre"
                        description="Nombre de la extención telefonica"
                        placeholder="Ej. Coordinación"
                        maxLength={MAX_TITLE_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.name?.length || 0}/{MAX_TITLE_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("name")}
                    />

                    <Divider />

                    <Select
                        classNames={{
                            option: "optionSelect"
                        }}
                        name="level"
                        label="Nivel"
                        data={[
                            ...levels.map((l) => ({ value: l.id.toString(), label: l.name }))
                        ]}
                        placeholder="Área..."
                        description="Selecciona el área al cual permanecerá el archivo"
                        withAsterisk
                        {...form.getInputProps("level")}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Jefe(a)"
                        description="Nombre del jefe(a) del área o departamento"
                        placeholder="Ej. Pablo Vazquez Reyes"
                        maxLength={MAX_NAME_PERSON_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.boss?.length || 0}/{MAX_NAME_PERSON_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("boss")}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Secretario(a)"
                        description="Nombre del secretario(o) del área o departamento"
                        placeholder="Ej. Pablo Vazquez Reyes"
                        maxLength={MAX_NAME_PERSON_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.secretary?.length || 0}/{MAX_NAME_PERSON_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("secretary")}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Correo Electrónico"
                        description="Corro electronico utilizado para enviar archivos"
                        placeholder="Ej. Ejemplo@ejemplo.com"
                        {...form.getInputProps("email")}
                    />
                </Fieldset>

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    )
}