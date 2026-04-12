import { Divider, Fieldset, FileInput, Select, Stack } from "@mantine/core";
import { ModalButtons } from "@/components";
import { useEffect, useState } from "react";
import { vacationShiftApi } from "../../api";
import { Notify } from "@/ui";
import type { UseFormReturnType } from "@mantine/form";

export interface FormValues {
    type: "CALENDAR" | "INDEX" | "";
    shift: string | null;
    file: File | null;
}

interface Props<T extends FormValues> {
    form: UseFormReturnType<T>;
    onSubmit: (values: T) => void;
    submitLabel: string;
    isLoading?: boolean;
    fileName?: string | null;
}

interface Shift {
    id: string | number;
    name: string;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, fileName }: Props<FormValues>) => {
    const [shifts, setShifts] = useState<Shift[]>([])

    const fetchShiftsData = async () => {
        try {
            const areasResp = await vacationShiftApi.fetch({})
            setShifts(areasResp.data || [])
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al ontener turnos",
                message: error instanceof Error ? error.message : "Error desconocido"
            });
            setShifts([])
        }
    }

    useEffect(() => {
        fetchShiftsData();
    }, []);

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset legend="Información">
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
                            { label: "Calendario", value: "CALENDAR" },
                            { label: "Index", value: "INDEX" },
                        ]}
                        {...form.getInputProps("type")}
                    />

                    <Divider />

                    <Select
                        classNames={{
                            option: "optionSelect"
                        }}
                        name="shift"
                        label="Turno"
                        data={[
                            ...shifts.map((s) => ({ value: s.id.toString(), label: s.name }))
                        ]}
                        placeholder="Turno..."
                        description="Selecciona el turno el cual permanecerá el archivo"
                        withAsterisk
                        {...form.getInputProps("shift")}
                    />
                </Fieldset>

                <Fieldset legend="Archivo">
                    <FileInput
                        withAsterisk
                        label="Archio"
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