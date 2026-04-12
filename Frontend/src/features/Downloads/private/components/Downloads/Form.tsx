import { Divider, Fieldset, FileInput, Select, Stack, Text, TextInput } from "@mantine/core";
import { ApiSelect, ModalButtons, Switch } from "@/components";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { useCallback, useEffect, useState } from "react";
import { addCategory, addSections, downloadAreaApi, fetchCategories, fetchSections } from "../../api";
import { Notify } from "@/ui";
import type { UseFormReturnType } from "@mantine/form";

export interface Section {
    id: number;
    name: string;
    isActive: boolean;
    areaId: number;
}

export interface Category {
    id: number;
    name: string;
    isActive: boolean;
    sectionId: number;
}

export interface FormValues {
    name: string;
    description: string;
    isNew: boolean;
    type: "DOCUMENT" | "IMAGE" | "";
    area: string | null;
    section: string | null;
    category: string | null;
    file: File | null;
}

interface Item {
    value: string;
    label: string;
}

interface Area {
    id: number;
    name: string;
}

interface Props<T extends FormValues> {
    form: UseFormReturnType<T>;
    onSubmit: (values: T) => void;
    submitLabel: string;
    isLoading?: boolean;
    fileName?: string | null;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, fileName }: Props<FormValues>) => {
    const [sections, setSections] = useState<Item[]>([])
    const [areas, setAreas] = useState<Area[]>([])
    const [loadingSections, setLoadingSections] = useState<boolean>(false)
    const [categories, setCategories] = useState<Item[]>([])
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false)

    const fetchAreasData = useCallback(async () => {
        try {
            const areasResp = await downloadAreaApi.fetch({});
            setAreas(areasResp.data || []);
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener áreas",
                message: error instanceof Error ? error.message : "Error desconocido"
            });
        }
    }, []);

    const fecthSectionsData = async () => {
        setLoadingSections(true)
        try {
            const res = await fetchSections(form.values.area ?? "");
            const formatted = res.data.map((item: Section) => ({
                value: item.id.toString(),
                label: item.name
            }))

            setSections(formatted);
        } finally {
            setLoadingSections(false)
        }
    }

    const fecthCategoriesData = async () => {
        setLoadingCategories(true)
        try {
            const res = await fetchCategories(form.values.section ?? "");
            const formatted = res.data.map((item: Category) => ({
                value: item.id.toString(),
                label: item.name
            }))

            setCategories(formatted);
        } finally {
            setLoadingCategories(false)
        }
    }

    useEffect(() => {
        fecthSectionsData()
    }, [form.values.area])

    useEffect(() => {
        fecthCategoriesData()
    }, [form.values.section])

    useEffect(() => { fetchAreasData(); }, [fetchAreasData]);

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

                    <Select
                        allowDeselect={false}
                        classNames={{
                            option: "optionSelect"
                        }}
                        withAsterisk
                        label="Tipo"
                        description="Tipo de archivo a descargar"
                        placeholder="Selecciona el tipo"
                        data={[
                            { label: "Documento", value: "DOCUMENT" },
                            { label: "Imagen", value: "IMAGE" },
                        ]}
                        {...form.getInputProps("type")}
                    />
                </Fieldset>

                <Fieldset legend="Ubicación">
                    <Select
                        classNames={{
                            option: "optionSelect"
                        }}
                        name="area"
                        label="Área"
                        data={[
                            ...areas.map((a) => ({ value: a.id.toString(), label: a.name }))
                        ]}
                        placeholder="Área..."
                        description="Selecciona el área al cual permanecerá el archivo"
                        withAsterisk
                        {...form.getInputProps("area")}
                        onChange={(value) => {
                            form.setFieldValue("area", value);
                            form.setFieldValue("section", null);
                            form.setFieldValue("category", null);
                            setSections([]);
                            setCategories([]);
                        }}
                    />

                    {form.values.area &&
                        <>
                            <Divider />
                            <ApiSelect
                                withAsterisk
                                form={form}
                                name="section"
                                label="Sección"
                                description="Selecciona la sección donde se encontrara el archivo dentro de área"
                                placeholder="Sección"
                                data={sections}
                                loading={loadingSections}
                                onCreate={async (name) => {
                                    const res = await addSections({ name, area: String(form.values.area) });
                                    const newItem = { value: res.id.toString(), label: res.name };
                                    setSections((prev) => [...prev, newItem]);
                                    return newItem;
                                }}
                                onChange={(value) => {
                                    form.setFieldValue("section", value);
                                    form.setFieldValue("category", null);
                                    setCategories([]);
                                }}
                            />
                        </>
                    }

                    {form.values.section &&
                        <>
                            <Divider />
                            <ApiSelect
                                withAsterisk
                                form={form}
                                name="category"
                                label="Categoria"
                                description="Selecciona la categoria donde se encontrara el archivo dentro de la sección"
                                placeholder="Categoria"
                                data={categories}
                                loading={loadingCategories}
                                onCreate={async (name) => {
                                    const res = await addCategory({ name, section: String(form.values.section) });
                                    const newItem = { value: res.id.toString(), label: res.name };
                                    setCategories((prev) => [...prev, newItem]);
                                    return newItem;
                                }}
                            />
                        </>
                    }
                </Fieldset>

                <Fieldset legend="Archivo">
                    <FileInput
                        withAsterisk
                        label="Descarga"
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