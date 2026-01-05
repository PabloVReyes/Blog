import { Card, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import type { SearchProps } from "./type";

export const Search = ({
    value,
    onChange,
    debounce = 250,
    placeholder = "Buscar...",
    minWidth = "300px",
    rightSection
}: SearchProps) => {
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
        <Card>
            <TextInput
                miw={minWidth}
                radius="xl"
                size="md"
                placeholder={placeholder}
                rightSectionWidth={42}
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                leftSection={<IconSearch size={18} stroke={2} />}
                rightSection={rightSection}
            />
        </Card>
    );
};
