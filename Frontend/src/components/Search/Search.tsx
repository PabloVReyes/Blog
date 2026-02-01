import { ActionIcon, TextInput } from "@mantine/core";
import { IconFilterSearch, IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";

interface Props {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    debounce?: number;
    minWidth?: string | number;
    onFilter?: () => void;
}

export const Search = ({
    value,
    onChange,
    debounce = 250,
    placeholder = "Buscar...",
    minWidth = "100px",
    onFilter
}: Props) => {
    const [input, setInput] = useState(value);
    const [debounced] = useDebouncedValue(input, debounce);

    useEffect(() => {
        if (debounced !== value) {
            onChange(debounced);
        }
    }, [debounced]);

    useEffect(() => {
        setInput(value);
    }, [value]);

    return (
        <TextInput
            style={{ flex: "30 1 auto" }}
            miw={minWidth}
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            leftSection={<IconSearch size={18} stroke={2} />}
            rightSection={
                (onFilter) &&
                <ActionIcon
                    size={32}
                    variant="filled"
                    onClick={onFilter}
                >
                    <IconFilterSearch size={18} stroke={1.5} />
                </ActionIcon>
            }
        />
    );
};
