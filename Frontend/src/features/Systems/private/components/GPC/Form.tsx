import { Divider, Fieldset, FileInput, Stack, Text, TextInput } from "@mantine/core";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { ApiSelect, ModalButtons } from "@/components";
import { useEffect, useState } from "react";
import { addCycle, fetchCycle } from "../../api";
import type { UseFormReturnType } from "@mantine/form";

interface Item {
    value: string;
    label: string;
}

interface FormValues {
    title: string;
    description?: string;
    orderIndex: number;
    cycle: string;
    file: File | null;
}

interface Props {
    form: UseFormReturnType<FormValues>
    onSubmit: (values: FormValues) => void;
    submitLabel: string;
    isLoading?: boolean;
    fileName?: string | null;
    initialCycle?: Item | null;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, fileName, initialCycle }: Props) => {
    const [cycles, setCycles] = useState<Item[]>([]);
    const [loadingCycles, setLoadingCycles] = useState<boolean>(false);

    useEffect(() => {
        fetchCyclesData();
    }, []);

    const fetchCyclesData = async () => {
        setLoadingCycles(true);
        try {
            const res = await fetchCycle();
            const formatted = res.data.map((item: any) => ({
                value: item.id.toString(),
                label: item.name,
            }));
            // incluir valor inicial si no existe en la lista
            if (initialCycle && !formatted.find((i: any) => i.value === initialCycle.value)) {
                formatted.unshift(initialCycle);
            }
            setCycles(formatted);
        } finally {
            setLoadingCycles(false);
        }
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
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
                        name="cycle"
                        label="Ciclo"
                        description="Seleccionar el ciclo el cual pertenece el algoritmo"
                        placeholder="Ciclo..."
                        data={cycles}
                        loading={loadingCycles}
                        initialItem={initialCycle}
                        onCreate={async (name) => {
                            const res = await addCycle({ name });
                            const newItem = { value: res.id.toString(), label: res.name };
                            setCycles((prev) => [...prev, newItem]);
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
                </Fieldset>

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    )
}