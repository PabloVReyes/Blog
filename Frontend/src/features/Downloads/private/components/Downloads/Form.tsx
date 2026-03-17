import { Divider, Fieldset, FileInput, Select, Stack, Text, TextInput } from "@mantine/core";
import { ApiSelect, ModalButtons, Switch } from "@/components";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { useEffect, useState } from "react";
import { addCategory, addSections, fetchAreas, fetchCategories, fetchSections } from "../../api";

interface Item {
    value: string;
    label: string;
}

interface Area {
    id: string;
    name: string;
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
    const [areas, setAreas] = useState<Area[]>([])
    const [loadingSections, setLoadingSections] = useState<boolean>(false)
    const [categories, setCategories] = useState<Item[]>([])
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false)

    const fetchAreasData = async () => {
        try {
            const areasResp = await fetchAreas({})
            setAreas(areasResp.data || [])
        } catch (erro: any) {
            console.error("Error en fetchAreas")
            setAreas([])
        }
    }

    const fetchSectionsData = async () => {
        setLoadingSections(true)
        try {
            const res = await fetchSections(form.values.area);
            const formatted = res.data.map((item: any) => ({
                value: item.id.toString(),
                label: item.name
            }))

            setSections(formatted);
        } finally {
            setLoadingSections(false)
        }
    }

    const fetchCategoriesData = async () => {
        setLoadingCategories(true)
        try {
            const res = await fetchCategories(form.values.section);
            const formatted = res.data.map((item: any) => ({
                value: item.id.toString(),
                label: item.name
            }))

            setCategories(formatted);
        } finally {
            setLoadingCategories(false)
        }
    }

    useEffect(() => {
        fetchSectionsData()
    }, [form.values.area])

    useEffect(() => {
        fetchCategoriesData()
    }, [form.values.section])

    useEffect(() => {
        fetchAreasData();
    }, []);

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
                        form={form}
                        name="area"
                        label="Área"
                        data={[
                            ...areas.map((a) => ({ value: a.id.toString(), label: a.name }))
                        ]}
                        placeholder="Área..."
                        description="Selecciona el área al cual permanecera el archivo"
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
                                    const res = await addSections({ name, area: form.values.area });
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
                                    const res = await addCategory({ name, section: form.values.section });
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