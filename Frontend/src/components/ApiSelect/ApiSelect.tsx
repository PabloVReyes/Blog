import { Combobox, InputBase, Loader, useCombobox } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { useState, type ChangeEvent, useMemo } from "react";

interface Item {
    value: string;
    label: string;
}

interface Props<T> {
    form: UseFormReturnType<T>;
    name: keyof T; // Eliminamos '& string' para mayor compatibilidad
    label: string;
    placeholder?: string;
    description?: string;
    data: Item[];
    onCreate?: (name: string) => Promise<Item | null>;
    loading?: boolean;
    required?: boolean;
    withAsterisk?: boolean;
    initialItem?: Item | null;
    onChange?: (value: string | null) => void;
}

export function ApiSelect<T>({
    form,
    name,
    label,
    placeholder,
    description,
    data,
    onCreate,
    loading,
    required,
    withAsterisk,
    initialItem,
    onChange
}: Props<T>) {
    const combobox = useCombobox();
    const [search, setSearch] = useState("");

    // Obtenemos el valor actual del form de forma segura
    const rawValue = form.values[name];
    const selectedValue = rawValue !== null && rawValue !== undefined ? String(rawValue) : "";

    // Buscamos el ítem seleccionado para mostrar el label en el input
    const selectedItem = useMemo(() => {
        return data.find((item: Item) => item.value === selectedValue) || initialItem || null;
    }, [data, selectedValue, initialItem]);

    const filtered = data.filter((item: Item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = async (val: string) => {
        let finalValue: string | null = null;

        if (val === "$create" && onCreate) {
            if (!search) return;
            const newItem = await onCreate(search);
            finalValue = newItem ? newItem.value : null;
        } else {
            finalValue = val;
        }

        if (finalValue !== null) {
            const isNumberField = typeof rawValue === 'number';
            const valueToSave = isNumberField ? Number(finalValue) : finalValue;

            form.setFieldValue(name as any, valueToSave as any);
            onChange?.(finalValue);
        }

        setSearch("");
        combobox.closeDropdown();
    };

    return (
        <Combobox store={combobox} onOptionSubmit={handleSubmit}>
            <Combobox.Target>
                <InputBase
                    withAsterisk={withAsterisk}
                    description={description}
                    label={label}
                    placeholder={placeholder}
                    required={required}
                    error={form.errors[name as string] as React.ReactNode}
                    // Si el dropdown está abierto, mostramos lo que el usuario escribe (search)
                    // Si está cerrado, mostramos el label del ítem seleccionado
                    value={combobox.dropdownOpened ? search : selectedItem?.label || ""}
                    onFocus={() => combobox.openDropdown()}
                    onClick={() => combobox.openDropdown()}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setSearch(e.currentTarget.value);
                        combobox.openDropdown();
                    }}
                    onBlur={() => {
                        setSearch("");
                        combobox.closeDropdown();
                    }}
                    rightSection={loading ? <Loader size="xs" /> : null}
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {filtered.length > 0 ? (
                        filtered.map((item: Item) => (
                            <Combobox.Option key={item.value} value={item.value}>
                                {item.label}
                            </Combobox.Option>
                        ))
                    ) : !search && !loading ? (
                        <Combobox.Empty>No encontrado</Combobox.Empty>
                    ) : null}

                    {search && !filtered.some((i: Item) => i.label === search) && onCreate && (
                        <Combobox.Option value="$create">
                            + Crear "{search}"
                        </Combobox.Option>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}