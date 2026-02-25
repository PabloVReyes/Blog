import { Divider, FileInput, Stack, Text, TextInput } from "@mantine/core";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { ApiSelect, ModalButtons } from "@/components";
import { useEffect, useState } from "react";
import { addCicle, fetchCicle } from "../../api";

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
    initialCicle?: Item | null;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, fileName, initialCicle }: Props) => {
    const [cicles, setCicles] = useState<Item[]>([]);
    const [loadingCicles, setLoadingCicles] = useState<boolean>(false);

    useEffect(() => {
        fetchCiclesData();
    }, []);

    const fetchCiclesData = async () => {
        setLoadingCicles(true);
        try {
            const res = await fetchCicle();
            const formatted = res.data.map((item: any) => ({
                value: item.id.toString(),
                label: item.name,
            }));
            // incluir valor inicial si no existe en la lista
            if (initialCicle && !formatted.find((i: any) => i.value === initialCicle.value)) {
                formatted.unshift(initialCicle);
            }
            setCicles(formatted);
        } finally {
            setLoadingCicles(false);
        }
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <div>
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
                        placeholder="Ej. Diagnóstico y tratamiento de transtornos depresivos"
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
                        name="cicle"
                        label="Ciclo"
                        description="Seleccionar el ciclo el cual pertenece el algoritmo"
                        placeholder="Ciclo..."
                        data={cicles}
                        loading={loadingCicles}
                        initialItem={initialCicle}
                        onCreate={async (name) => {
                            const res = await addCicle({ name });
                            const newItem = { value: res.id.toString(), label: res.name };
                            setCicles((prev) => [...prev, newItem]);
                            return newItem;
                        }}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Prioridad"
                        type="number"
                        description="Prioridad del algoritmo"
                        placeholder="Ej. 1"
                        {...form.getInputProps("orderIndex")}
                    />

                    <Divider />

                    <FileInput
                        withAsterisk
                        label="Algoritmo"
                        description={
                            fileName ?
                                `El archivo cargado es: ${fileName}` :
                                "Selecciona un archivo perteneciente al algoritmo"
                        }
                        accept=".pdf"
                        placeholder="Algoritmo.pdf"
                        {...form.getInputProps("file")}
                    />
                </div>

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    )
}