import { Combobox, InputBase, Loader, useCombobox } from "@mantine/core";
import { useState } from "react";

interface Item {
    value: string;
    label: string;
}

interface Props {
    form: any;
    name: string;
    label: string;
    placeholder?: string;
    description?: string;
    data: Item[];
    onCreate?: (name: string) => Promise<Item | null>;
    loading?: boolean;
    required?: boolean;
    withAsterisk?: boolean;
    initialItem?: Item | null; // valor inicial
}

export function ApiSelect({
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
}: Props) {
    const combobox = useCombobox();
    const [search, setSearch] = useState("");

    // Valor seleccionado inicial
    const selectedValue = form.values[name];
    const selectedItem = data.find((item) => item.value === selectedValue) || initialItem || null;

    const filtered = data.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = async (val: string) => {
        if (val === "$create" && onCreate) {
            if (!search) return;
            const newItem = await onCreate(search.toUpperCase());
            if (newItem) {
                form.setFieldValue(name, newItem.value);
                setSearch("");
            }
        } else {
            form.setFieldValue(name, val);
            setSearch("");
        }

        combobox.closeDropdown();
    };

    return (
        <Combobox store={combobox} onOptionSubmit={handleSubmit}

            classNames={{
                option: "optionSelect"
            }}
            >
            <Combobox.Target>
                <InputBase
                    withAsterisk={withAsterisk}
                    description={description}
                    label={label}
                    placeholder={placeholder}
                    required={required}
                    error={form.errors[name]}
                    value={combobox.dropdownOpened ? search : selectedItem?.label || ""}
                    onFocus={() => combobox.openDropdown()}
                    onClick={() => combobox.openDropdown()}
                    onChange={(e) => {
                        setSearch(e.currentTarget.value.toUpperCase());
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
                    {filtered.map((item) => (
                        <Combobox.Option key={item.value} value={item.value}>
                            {item.label}
                        </Combobox.Option>
                    ))}

                    {search && !filtered.some((i) => i.label === search) && onCreate && (
                        <Combobox.Option value="$create">
                            + Crear "{search}"
                        </Combobox.Option>
                    )}

                    {filtered.length === 0 && !search && !loading && (
                        <Combobox.Empty>No encontrado</Combobox.Empty>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}