import { Divider, Fieldset, FileInput, Stack, Text, TextInput } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { useEffect, useState } from "react";
import { ApiSelect, ModalButtons, Switch } from "@/components";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { addSection, fetchSections } from "../api";

interface Item {
    value: string;
    label: string;
}

export interface FormValues {
    name: string;
    description: string;
    isNew: boolean;
    section: string;
    file: File | null;
    [key: string]: unknown;
}

interface Props<T extends FormValues> {
    form: UseFormReturnType<T>;
    onSubmit: (values: T) => void;
    submitLabel: string;
    isLoading?: boolean;
    fileName?: string | null;
}

interface SectionApiResponse {
    id: number | string;
    name: string;
}

export const Form = <T extends FormValues>({
    form,
    onSubmit,
    submitLabel,
    isLoading,
    fileName
}: Props<T>) => {
    const [sections, setSections] = useState<Item[]>([]);
    const [loadingSections, setLoadingSections] = useState<boolean>(false);

    const fetchSectionsData = async () => {
        setLoadingSections(true);
        try {
            const res = await fetchSections();
            const formatted: Item[] = res.data.map((item: SectionApiResponse) => ({
                value: item.id.toString(),
                label: item.name
            }));
            setSections(formatted);
        } finally {
            setLoadingSections(false);
        }
    };

    useEffect(() => {
        fetchSectionsData();
    }, []);

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset legend="Información">
                    <TextInput
                        withAsterisk
                        label="Nombre"
                        description="Nombre del Certificado"
                        placeholder="Ej. Evaluación del MUEC"
                        maxLength={MAX_TITLE_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {(form.values.name as string)?.length || 0}/{MAX_TITLE_LENGTH}
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
                                {(form.values.description as string)?.length || 0}/{MAX_DESCRIPTION_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("description")}
                    />

                    <Divider />

                    <Switch
                        value="isNew"
                        label="Nuevo"
                        description='Si esta opción esta activada, aparecera un mensaje de "nuevo" a un costado del documento'
                        checked={form.values.isNew as boolean}
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
                        onCreate={async (name: string) => {
                            const res = await addSection({ name });
                            const newItem: Item = { value: res.id.toString(), label: res.name };
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
    );
};