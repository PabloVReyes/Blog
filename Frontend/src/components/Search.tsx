import { ActionIcon, TextInput, useMantineTheme } from "@mantine/core"
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

interface SearchStore {
    search: string;
    setSearch: (value: string) => void;
}

interface Props {
    useStore: () => SearchStore;
}

export const Search = ({
    useStore
}: Props) => {
    const { search, setSearch } = useStore();
    const [inputValue, setInputValue] = useState(search)
    const theme = useMantineTheme();

    const handleSearch = () => {
        setSearch(inputValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            handleSearch();
        }
    }

    return (
        <TextInput
            miw="300px"
            radius="xl"
            size="md"
            placeholder={"Buscar..."}
            rightSectionWidth={42}
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            leftSection={<IconSearch size={18} stroke={2} />}
            rightSection={
                <ActionIcon
                    size={32}
                    radius="xl"
                    color={theme.primaryColor}
                    variant="filled"
                    onClick={handleSearch}
                >
                    <IconArrowRight size={18} stroke={1.5} />
                </ActionIcon>
            }
        />
    )
}