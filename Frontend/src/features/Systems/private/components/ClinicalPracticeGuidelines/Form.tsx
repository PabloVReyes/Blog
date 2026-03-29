import { Divider, Fieldset, FileInput, Stack, Text, TextInput } from "@mantine/core";
import { MAX_CODE_MEDICAL_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { ApiSelect, ModalButtons } from "@/components";
import { useEffect, useState } from "react";
import { addCategory, fetchCategorys } from "../../api";

interface Item {
    value: string;
    label: string;
}

interface Props {
    form: any;
    onSubmit: (values: any) => void;
    submitLabel: string;
    isLoading?: boolean;
    fileNameER?: string | null;
    fileNameRR?: string | null;
    initialCategory?: Item | null;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, initialCategory, fileNameER, fileNameRR }: Props) => {
    const [categorys, setCategorys] = useState<Item[]>([])
    const [loadingCategorys, setLoadingCategorys] = useState<boolean>(false)

    useEffect(() => {
        fetchCategorysData()
    }, [])

    const fetchCategorysData = async () => {
        setLoadingCategorys(true);

        try {
            const res = await fetchCategorys();
            const formatted = res.data.map((item: any) => ({
                value: item.id.toString(),
                label: item.name
            }));

            if (initialCategory && !formatted.find((i: any) => i.value === initialCategory.value)) {
                formatted.unshift(initialCategory);
            }

            setCategorys(formatted)
        } finally {
            setLoadingCategorys(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset>
                    <TextInput
                        withAsterisk
                        label="Clave"
                        description="Clave de la guía"
                        placeholder="Ej. DIF-707-14"
                        maxLength={MAX_CODE_MEDICAL_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.code?.length || 0}/{MAX_CODE_MEDICAL_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("code")}
                        onChange={(event) => {
                            form.setFieldValue("code", event.currentTarget.value.toUpperCase());
                        }}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Título"
                        description="Título de la guía"
                        placeholder="Ej. Atención integral en neurorehabilitación del niño pre término, primer y segundo nivel de atención"
                        maxLength={MAX_TITLE_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.title?.length || 0}/{MAX_TITLE_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("title")}
                    />

                    <Divider />

                    <ApiSelect
                        form={form}
                        name="category"
                        label="Categoria"
                        placeholder="Categoria..."
                        description="Selecciona o agrega la categoria de la guía"
                        withAsterisk
                        data={categorys}
                        loading={loadingCategorys}
                        initialItem={initialCategory}
                        onCreate={async (name) => {
                            const res = await addCategory({ name });
                            const newItem = { value: res.id.toString(), label: res.name };
                            setCategorys((prev) => [...prev, newItem]);
                            return newItem;
                        }}
                    />

                    <Divider />

                    <FileInput
                        withAsterisk
                        label="Guía de Evidencias y Recomendaciones (ER)"
                        description={
                            fileNameER ?
                                `El archivo cargado es: ${fileNameER}` :
                                "Selecciona un archivo perteneciente a guía de evidencias y recomendaciones"
                        }
                        accept=".pdf"
                        placeholder="Guía de Evidencias y Recomendaciones.pdf"
                        {...form.getInputProps("er")}
                    />

                    <Divider />

                    <FileInput
                        withAsterisk
                        label="Guía de Referencia Rápida (RR)"
                        description={
                            fileNameRR ?
                                `El archivo cargado es: ${fileNameRR}` :
                                "Selecciona un archivo perteneciente a guía de referencia rápida"
                        }
                        accept=".pdf"
                        placeholder="Guía de Referencia Rápida.pdf"
                        {...form.getInputProps("rr")}
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