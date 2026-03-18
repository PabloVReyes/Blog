import { Divider, Fieldset, FileInput, Select, Stack } from "@mantine/core";
import { ModalButtons } from "@/components";
import { useEffect, useState } from "react";
import { vacationShiftApi } from "../../api";


interface Props {
    form: any;
    onSubmit: (values: any) => void;
    submitLabel: string;
    isLoading?: boolean;
    fileName?: string;
}

interface Shift {
    id: string;
    name: string;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, fileName }: Props) => {
    const [shifts, setShifts] = useState<Shift[]>([])

    const fetchShiftsData = async () => {
        try {
            const areasResp = await vacationShiftApi.fetch({})
            setShifts(areasResp.data || [])
        } catch (erro: any) {
            console.error("Error en fetchShiftsData")
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
                        form={form}
                        name="shift"
                        label="Turno"
                        data={[
                            ...shifts.map((s) => ({ value: s.id.toString(), label: s.name }))
                        ]}
                        placeholder="Turno..."
                        description="Selecciona el turno el cual permanecera el archivo"
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