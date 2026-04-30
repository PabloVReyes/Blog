import { Divider, Fieldset, FileInput, Text, TextInput } from "@mantine/core";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { ApiSelect, BaseForm } from "@/components";
import { useEffect, useState } from "react";
import { addCareCategory, fetchCareCategory } from "../../api";
import type { UseFormReturnType } from "@mantine/form";

interface Item {
    value: string;
    label: string;
}

export interface FormValues {
    title: string;
    description: string;
    category: string;
    file: File | null
}

interface Props<T extends FormValues> {
    form: UseFormReturnType<T>
    onSubmit: (values: T) => void;
    submitLabel: string;
    isLoading?: boolean;
    fileName?: string | null;
    initialCategory?: Item | null;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, fileName, initialCategory }: Props<FormValues>) => {
    const [categories, setCategories] = useState<Item[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false);

    useEffect(() => {
        fetchCategoryData();
    }, []);

    const fetchCategoryData = async () => {
        setLoadingCategories(true);
        try {
            const res = await fetchCareCategory();
            const formatted = res.data.map((item: any) => ({
                value: item.id.toString(),
                label: item.name,
            }));
            // incluir valor inicial si no existe en la lista
            if (initialCategory && !formatted.find((i: any) => i.value === initialCategory.value)) {
                formatted.unshift(initialCategory);
            }
            setCategories(formatted);
        } finally {
            setLoadingCategories(false);
        }
    };

    return (
        <BaseForm
            form={form}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
            isLoading={isLoading}
        >
            <Fieldset>
                <TextInput
                    withAsterisk
                    label="Título"
                    description="Título del algoritmo"
                    placeholder="Ej. Algoritmo Depresión"
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

                <TextInput
                    withAsterisk
                    label="Descripción"
                    description="Descripción del algoritmo"
                    placeholder="Ej. Diagnóstico y tratamiento de trastornos depresivos"
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

                <ApiSelect
                    form={form}
                    name="category"
                    label="Categoría"
                    description="Seleccionar la categoria cual pertenece el protocolo"
                    placeholder="Categoría..."
                    data={categories}
                    loading={loadingCategories}
                    initialItem={initialCategory}
                    onCreate={async (name) => {
                        const res = await addCareCategory({ name });
                        const newItem = { value: res.id.toString(), label: res.name };
                        setCategories((prev) => [...prev, newItem]);
                        return newItem;
                    }}
                />

                <Divider />

                <FileInput
                    withAsterisk
                    label="Protocolo"
                    description={
                        fileName ?
                            `El archivo cargado es: ${fileName}` :
                            "Selecciona un archivo perteneciente al protocolo"
                    }
                    accept=".pdf"
                    placeholder="Protocolo.pdf"
                    {...form.getInputProps("file")}
                />
            </Fieldset>
        </BaseForm>
    )
}