import { Divider, Fieldset, FileInput, Select, Text, TextInput } from "@mantine/core";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, MAX_YEAR_LENGTH } from "@/constants";
import { BaseForm } from "@/components";
import type { UseFormReturnType } from "@mantine/form";

export interface FormValues {
    title: string;
    description?: string;
    type: string;
    month?: string;
    year: string;
    file: File | null;
}

interface Props<T extends FormValues> {
    form: UseFormReturnType<T>;
    onSubmit: (values: T) => void;
    submitLabel: string;
    isLoading?: boolean;
    fileName?: string | null;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, fileName }: Props<FormValues>) => {
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
                    description="Título del informe"
                    placeholder="Informe mensual"
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
                    label="Descripción"
                    description="Descripción del informe"
                    placeholder="Ej. Informe mensual que muestra estadisticas de..."
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

                <Select
                    withAsterisk
                    label="Tipo de informe"
                    description="Selecciona el tipo de informe a cargar"
                    allowDeselect={false}
                    data={[
                        { value: "MONTHLY", label: "Mensual" },
                        { value: "ANNUAL", label: "Anual" },
                        { value: "STATISTICAL", label: "Estadistico" },
                        { value: "EXTRA", label: "Extra" }
                    ]}
                    {...form.getInputProps("type")}
                />

                {form.values?.type === "MONTHLY" &&
                    <div>
                        <Divider />
                        <Select
                            withAsterisk
                            label="Mes"
                            allowDeselect={false}
                            description="Selecciona el mes del informe"
                            data={[
                                { value: "1", label: "Enero" },
                                { value: "2", label: "Febrero" },
                                { value: "3", label: "Marzo" },
                                { value: "4", label: "Abril" },
                                { value: "5", label: "Mayo" },
                                { value: "7", label: "Junio" },
                                { value: "8", label: "Julio" },
                                { value: "9", label: "Agosto" },
                                { value: "10", label: "Septiembre" },
                                { value: "11", label: "Octubre" },
                                { value: "12", label: "Noviembre" },
                                { value: "13", label: "Diciembre" },
                            ]}
                            {...form.getInputProps("month")}
                        />
                    </div>
                }

                <Divider />
                <TextInput
                    label="Año"
                    description="Introduce el año del informe"
                    placeholder="Ej. 2025"
                    maxLength={MAX_YEAR_LENGTH}
                    rightSection={
                        <Text size="xs" c="dimmed">
                            {form.values.year?.length || 0}/{MAX_YEAR_LENGTH}
                        </Text>
                    }
                    rightSectionWidth={30}
                    {...form.getInputProps("year")}
                />

                <Divider />

                <FileInput
                    withAsterisk
                    label="Archivo"
                    description={
                        fileName ?
                            `El archivo cargado es ${fileName}` :
                            "Selecciona el archivo del informe mensual"
                    }
                    accept=".pdf"
                    placeholder="archivo.pdf"
                    {...form.getInputProps("file")}
                />
            </Fieldset>
        </BaseForm>
    )
}