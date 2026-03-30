import { Burger, Button, Group, useComputedColorScheme } from "@mantine/core"
import styles from "./Header.module.css"
import { IconBook, IconSearch } from "@tabler/icons-react"
import { useHotkeys, useOs } from "@mantine/hooks"
import { Search } from "./Search"
import { Directory } from "./Directory"
import { useNavigate } from "react-router-dom"
import { useSettingStore } from "@/features"
import { useModalStore } from "@/layout/store"

interface Props {
    mobileOpen: boolean;
    toggleSidebar: () => void;
    isMobile: boolean;
}


export const Header = ({ isMobile, mobileOpen, toggleSidebar }: Props) => {
    const { setTheme } = useSettingStore();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    const os = useOs();
    const { openModal } = useModalStore()
    const navigate = useNavigate();

    const handleTheme = () => {
        setTheme(computedColorScheme === 'light' ? 'dark' : 'light')
    }

    const handleSearch = () => {
        openModal({
            title: "Buscar",
            subtitle: "Buscar en el sistema",
            icon: "IconSearch",
            content: <Search />
        })
    }

    const handleDirectory = () => {
        openModal({
            title: "Directorio",
            subtitle: "Ver el directorio de extensiones telefónicas",
            icon: "IconBook",
            content: <Directory />
        })
    }

    const handleAdmin = () => {
        navigate('/administracion')
    }

    useHotkeys([
        [
            os === 'macos' ? 'mod+k' : 'ctrl+k',
            handleSearch
        ],
        [
            os === 'macos' ? 'mod+shift+d' : "ctrl+shift+d",
            handleDirectory
        ],
        [
            'ctrl+shift+m',
            handleAdmin
        ],
        [
            os === 'macos' ? 'mod+j' : 'ctrl+j',
            handleTheme,
        ]
    ])

    return (
        <header className={styles.header}>
            <Group justify="space-between" h="100%">
                <Group gap={5} ml={"xs"}>
                    {isMobile && (
                        <Burger
                            color="var(--mantine-primary-color-contrast)"
                            opened={mobileOpen}
                            onClick={toggleSidebar}
                            size="md"
                        />
                    )}
                    <Button
                        variant="subtle"
                        onClick={handleSearch}
                        className={styles.search}
                        leftSection={
                            <IconSearch />
                        }
                    >
                        Buscar
                    </Button>
                </Group>

                <Button
                    mr={"sm"}
                    onClick={handleDirectory}
                    variant="subtle"
                    className={styles.search}
                    leftSection={
                        <IconBook />
                    }
                >
                    Directorio
                </Button>
            </Group>
        </header>
    )
}