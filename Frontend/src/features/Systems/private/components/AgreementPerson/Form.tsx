import { Divider, Stack, Text, TextInput, Select, Fieldset } from "@mantine/core";
import { ModalButtons } from "@/components";
import { MAX_NAME_PERSON_LENGTH } from "@/constants";
import { useEffect, useState, useCallback } from "react";
import {
    addGroup,
    fetchGroups,
    addZone,
    fetchZones,
    fetchAgreementPersonHolders,
} from "../../api";
import { ApiSelect } from "@/components";
import { RemotePaginatedSelect } from "./RemotePaginatedSelect";
import type { UseFormReturnType } from "@mantine/form";

interface Item {
    value: string;
    label: string;
}

interface FormValues {
    name: string;
    group: string;
    zone: string;
    type: "HOLDER" | "DEPENDENT";
    holder?: string;
}

interface Props {
    form: UseFormReturnType<FormValues>
    onSubmit: (values: FormValues) => void;
    submitLabel: string;
    isLoading?: boolean;
    initialGroup?: Item | null;
    initialZone?: Item | null;
    initialHolder?: Item | null;
}

export const Form = ({
    form,
    onSubmit,
    submitLabel,
    isLoading,
    initialGroup,
    initialZone,
    initialHolder,
}: Props) => {
    const [groups, setGroups] = useState<Item[]>([]);
    const [zones, setZones] = useState<Item[]>([]);
    const [loadingGroups, setLoadingGroups] = useState(false);
    const [loadingZones, setLoadingZones] = useState(false);

    // ================= Cargar listas =================
    useEffect(() => {
        fetchGroupsData();
        fetchZonesData();
    }, []);

    const fetchGroupsData = async () => {
        setLoadingGroups(true);
        try {
            const res = await fetchGroups();
            const formatted = res.data.map((item: any) => ({
                value: item.id.toString(),
                label: item.name,
            }));
            // incluir valor inicial si no existe en la lista
            if (initialGroup && !formatted.find((i: any) => i.value === initialGroup.value)) {
                formatted.unshift(initialGroup);
            }
            setGroups(formatted);
        } finally {
            setLoadingGroups(false);
        }
    };

    const fetchZonesData = async () => {
        setLoadingZones(true);
        try {
            const res = await fetchZones();
            const formatted = res.data.map((item: any) => ({
                value: item.id.toString(),
                label: item.name,
            }));
            if (initialZone && !formatted.find((i: any) => i.value === initialZone.value)) {
                formatted.unshift(initialZone);
            }
            setZones(formatted);
        } finally {
            setLoadingZones(false);
        }
    };

    // ================= API para titulares remotos =================
    const fetchHolders = useCallback(
        async ({ search, page, limit }: any) => {
            const res = await fetchAgreementPersonHolders({ search, page, limit });
            return {
                data: res.data.map((item: any) => ({
                    value: item.id.toString(),
                    label: item.name,
                })),
                total: res.meta.total,
            };
        },
        []
    );

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset>
                    <TextInput
                        withAsterisk
                        label="Nombre"
                        description="Nombre completo del paciente"
                        placeholder="Ej. Pablo Vazquez Reyes"
                        maxLength={MAX_NAME_PERSON_LENGTH}
                        rightSection={<Text size="xs" c="dimmed">{form.values.name?.length || 0}/{MAX_NAME_PERSON_LENGTH}</Text>}
                        rightSectionWidth={40}
                        {...form.getInputProps("name")}
                        onChange={(e) => form.setFieldValue("name", e.currentTarget.value.toUpperCase())}
                    />

                    <Divider />

                    {/* Grupo */}
                    <ApiSelect
                        form={form}
                        name="group"
                        label="Grupo"
                        placeholder="Grupo..."
                        description="Selecciona o agrega el grupo del paciente"
                        withAsterisk
                        data={groups}
                        loading={loadingGroups}
                        initialItem={initialGroup}
                        onCreate={async (name) => {
                            const res = await addGroup({ name });
                            const newItem = { value: res.id.toString(), label: res.name };
                            setGroups((prev) => [...prev, newItem]);
                            return newItem;
                        }}
                    />

                    <Divider />

                    {/* Zona */}
                    <ApiSelect
                        form={form}
                        name="zone"
                        label="Zona"
                        placeholder="Zona..."
                        description="Selecciona o agrega la zona del paciente"
                        withAsterisk
                        data={zones}
                        loading={loadingZones}
                        initialItem={initialZone}
                        onCreate={async (name) => {
                            const res = await addZone({ name });
                            const newItem = { value: res.id.toString(), label: res.name };
                            setZones((prev) => [...prev, newItem]);
                            return newItem;
                        }}
                    />

                    <Divider />

                    {/* Tipo */}
                    <Select
                        classNames={{
                            option: "optionSelect"
                        }}
                        withAsterisk
                        label="Tipo de paciente de convenio"
                        description="Selecciona si el paciente es titular o dependiente"
                        allowDeselect={false}
                        data={[
                            { value: "HOLDER", label: "Titular" },
                            { value: "DEPENDENT", label: "Dependiente" },
                        ]}
                        {...form.getInputProps("type")}
                    />


                    {/* Titular */}
                    {form.values.type === "DEPENDENT" &&
                        <>
                            <Divider />

                            <RemotePaginatedSelect
                                withAsterisk
                                form={form}
                                name="holder"
                                label="Titular"
                                description="Selecciona el titular del dependiente"
                                placeholder="Buscar titular..."
                                fetchData={fetchHolders}
                                initialItem={initialHolder}
                            />
                        </>
                    }

                </Fieldset>

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    );
};