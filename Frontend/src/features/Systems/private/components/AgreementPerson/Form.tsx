import { Divider, Stack, Text, TextInput, Select, Fieldset } from "@mantine/core";
import { ModalButtons, ApiSelect } from "@/components";
import { MAX_NAME_PERSON_LENGTH } from "@/constants";
import { useEffect, useState, useCallback } from "react";
import {
    addGroup,
    fetchGroups,
    addZone,
    fetchZones,
    fetchAgreementPersonHolders,
} from "../../api";
import { RemotePaginatedSelect } from "./RemotePaginatedSelect";
import type { UseFormReturnType } from "@mantine/form";

interface Item {
    value: string;
    label: string;
}

interface ApiResource {
    id: number | string;
    name: string;
}

interface ApiResponse<T> {
    data: T[];
    meta?: {
        total: number;
    };
}

interface FetchParams {
    search: string;
    page: number;
    limit: number;
}

export interface FormValues {
    name: string;
    group: string | null;
    zone: string | null;
    type: "HOLDER" | "DEPENDENT";
    holder: string | null;
}

interface Props<T extends FormValues> {
    form: UseFormReturnType<T>;
    onSubmit: (values: T) => void;
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
}: Props<FormValues>) => {
    const [groups, setGroups] = useState<Item[]>([]);
    const [zones, setZones] = useState<Item[]>([]);
    const [loadingGroups, setLoadingGroups] = useState(false);
    const [loadingZones, setLoadingZones] = useState(false);

    const formatToItem = (item: ApiResource): Item => ({
        value: item.id.toString(),
        label: item.name,
    });

    const fetchGroupsData = async () => {
        setLoadingGroups(true);
        try {
            const res: ApiResponse<ApiResource> = await fetchGroups();
            const formatted = res.data.map(formatToItem);

            if (initialGroup && !formatted.some(i => i.value === initialGroup.value)) {
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
            const res: ApiResponse<ApiResource> = await fetchZones();
            const formatted = res.data.map(formatToItem);

            if (initialZone && !formatted.some(i => i.value === initialZone.value)) {
                formatted.unshift(initialZone);
            }
            setZones(formatted);
        } finally {
            setLoadingZones(false);
        }
    };

    useEffect(() => {
        fetchGroupsData();
        fetchZonesData();
    }, []);

    const fetchHolders = useCallback(
        async ({ search, page, limit }: FetchParams) => {
            const res: ApiResponse<ApiResource> = await fetchAgreementPersonHolders({ search, page, limit });
            return {
                data: res.data.map(formatToItem),
                total: res.meta?.total ?? 0,
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
                        placeholder="Ej. PABLO VAZQUEZ REYES"
                        maxLength={MAX_NAME_PERSON_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.name?.length || 0}/{MAX_NAME_PERSON_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("name")}
                        onChange={(e) => form.setFieldValue("name", e.currentTarget.value.toUpperCase())}
                    />

                    <Divider />

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
                        onCreate={async (name: string) => {
                            const res: ApiResource = await addGroup({ name });
                            const newItem = formatToItem(res);
                            setGroups((prev) => [...prev, newItem]);
                            return newItem;
                        }}
                    />

                    <Divider />

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
                        onCreate={async (name: string) => {
                            const res: ApiResource = await addZone({ name });
                            const newItem = formatToItem(res);
                            setZones((prev) => [...prev, newItem]);
                            return newItem;
                        }}
                    />

                    <Divider />

                    <Select
                        classNames={{ option: "optionSelect" }}
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

                    {form.values.type === "DEPENDENT" && (
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
                    )}
                </Fieldset>

                <ModalButtons label={submitLabel} loading={isLoading} />
            </Stack>
        </form>
    );
};