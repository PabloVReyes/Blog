import { Divider, Fieldset, FileInput, Stack, Text, TextInput } from "@mantine/core";
import { ApiSelect, ModalButtons, Switch } from "@/components";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { useEffect, useState } from "react";
import { addSection, fetchSections } from "../api";

interface Item {
    value: string;
    label: string;
}

interface Props {
    form: any;
    onSubmit: (values: any) => void;
    submitLabel: string;
    isLoading?: boolean;
    fileName?: string;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, fileName }: Props) => {
    const [sections, setSections] = useState<Item[]>([])
    const [loadingSections, setLoadingSections] = useState<boolean>(false)

    const fecthSectionsData = async () => {
        setLoadingSections(true)
        try {
            const res = await fetchSections();
            const formatted = res.data.map((item: any) => ({
                value: item.id.toString(),
                label: item.name
            }))

            setSections(formatted);
        } finally {
            setLoadingSections(false)
        }
    }


    useEffect(() => {
        fecthSectionsData()
    }, [])

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset legend="Información">
                    <TextInput
                        withAsterisk
                        label="Nombre"
                        description="Nombre del Área"
                        placeholder="Ej. Dirección"
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
                        label="Descripción"
                        description="Descripción optional del documento"
                        placeholder="Ej. Documento que contiene información"
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.description?.length || 0}/{MAX_DESCRIPTION_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("description")}
                    />

                    <Divider />

                    <Switch
                        label="Nuevo"
                        description='Si esta opción esta activada, aparecera un mensaje de "nuevo" a un costado del documento'
                        value={form.values.isNew}
                        {...form.getInputProps("isNew", { type: "checkbox" })}
                    />

                    <Divider />

                    <ApiSelect
                        withAsterisk
                        form={form}
                        name="section"
                        label="Sección"
                        description="Selecciona la sección donde se encontrara el archivo"
                        placeholder="Sección"
                        data={sections}
                        loading={loadingSections}
                        onCreate={async (name) => {
                            const res = await addSection({ name, section: form.values.section });
                            const newItem = { value: res.id.toString(), label: res.name };
                            setSections((prev) => [...prev, newItem]);
                            return newItem;
                        }}
                    />

                </Fieldset>

                <Fieldset legend="Archivo">
                    <FileInput
                        withAsterisk
                        label="Descarga"
                        accept="application/pdf"
                        description={
                            fileName ?
                                `El archivo cargado es: ${fileName}` :
                                "Selecciona un archivo perteneciente a la descarga"
                        }
                        placeholder="Download.pdf"
                        {...form.getInputProps("file")}
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