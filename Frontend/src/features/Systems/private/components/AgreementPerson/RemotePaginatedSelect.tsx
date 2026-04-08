import {
    Combobox,
    InputBase,
    Loader,
    ScrollArea,
    useCombobox,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import type { UseFormReturnType } from "@mantine/form";

interface Item {
    value: string;
    label: string;
}

interface FetchDataParams {
    search: string;
    page: number;
    limit: number;
}

interface FetchDataResult {
    data: Item[];
    total: number;
}

interface Props<T> {
    // T representa el esquema de valores de tu formulario
    form: UseFormReturnType<T>;
    // Usamos keyof T para asegurar que 'name' sea una propiedad válida del formulario
    name: keyof T & string;
    label: string;
    placeholder?: string;
    description?: string;
    fetchData: (params: FetchDataParams) => Promise<FetchDataResult>;
    required?: boolean;
    withAsterisk?: boolean;
    initialItem?: Item | null;
}

export function RemotePaginatedSelect<T>({
    form,
    name,
    label,
    placeholder,
    description,
    fetchData,
    required,
    withAsterisk,
    initialItem,
}: Props<T>) {
    const combobox = useCombobox();
    const LIMIT = 20;

    // Acceso tipado a los valores y errores del formulario
    const value = form.values[name];
    const [search, setSearch] = useState("");
    const [debounced] = useDebouncedValue(search, 400);

    const [data, setData] = useState<Item[]>(initialItem ? [initialItem] : []);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(initialItem ? 1 : 0);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(initialItem || null);

    const hasMore = data.length < total;

    // ================= FETCH =================
    const loadData = async (searchValue: string, pageValue: number, append = false) => {
        if (loading) return;

        setLoading(true);
        try {
            const res = await fetchData({ search: searchValue, page: pageValue, limit: LIMIT });
            setTotal(res.total);
            setData((prev) => (append ? [...prev, ...res.data] : res.data));
        } finally {
            setLoading(false);
        }
    };

    // ================= NUEVA BUSQUEDA =================
    useEffect(() => {
        setPage(1);
        // Si no hay búsqueda y no hay datos (salvo el inicial), cargamos iniciales
        if (!debounced.trim()) {
            // Opcional: podrías cargar una lista inicial vacía aquí si prefieres
            return;
        }

        loadData(debounced.toUpperCase(), 1, false);
    }, [debounced]);

    // ================= SCROLL =================
    const handleScrollEnd = () => {
        if (!hasMore || loading) return;
        const nextPage = page + 1;
        setPage(nextPage);
        loadData(debounced.toUpperCase(), nextPage, true);
    };

    // ================= SELECCION =================
    const handleSubmit = (val: string) => {
        const item = data.find((i) => i.value === val) || null;
        if (item) setSelectedItem(item);

        // Seteo tipado del valor
        form.setFieldValue(name, val as any);
        combobox.closeDropdown();
        setSearch("");
    };

    // ================= SINCRONIZAR CON FORM =================
    useEffect(() => {
        if (!value) {
            setSelectedItem(null);
            return;
        }
        if (selectedItem?.value === value) return;
        const found = data.find((i) => i.value === value);
        if (found) setSelectedItem(found);
    }, [value, data]);

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
                    error={form.errors[name as string]}
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
                <ScrollArea.Autosize mah={200} onBottomReached={handleScrollEnd}>
                    <Combobox.Options>
                        {data.map((item) => (
                            <Combobox.Option key={item.value} value={item.value}>
                                {item.label}
                            </Combobox.Option>
                        ))}

                        {loading && <Combobox.Empty>Cargando...</Combobox.Empty>}
                        {!loading && data.length === 0 && <Combobox.Empty>Sin resultados</Combobox.Empty>}
                        {hasMore && !loading && <Combobox.Empty>Desplaza para cargar más...</Combobox.Empty>}
                    </Combobox.Options>
                </ScrollArea.Autosize>
            </Combobox.Dropdown>
        </Combobox>
    );
}