import { Burger, Button, Group, Kbd, useComputedColorScheme } from "@mantine/core"
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
            content: <Search />
        })
    }

    const handleDirectory = () => {
        openModal({
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
                        rightSection={
                            !isMobile &&
                            <div dir="ltr">
                                <Kbd className={styles.kbd} size={"xs"}>{os !== 'macos' ? "CTRL" : "COMMAND"}</Kbd> + <Kbd className={styles.kbd} size={"xs"}>K</Kbd>
                            </div>
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
                    rightSection={
                        !isMobile &&
                        <div dir="ltr">
                            <Kbd className={styles.kbd} size={"xs"}>{os !== 'macos' ? "CTRL" : "COMMAND"}</Kbd> + <Kbd size={"xs"} className={styles.kbd}>SHIFT</Kbd> + <Kbd className={styles.kbd} size={"xs"}>D</Kbd>
                        </div>
                    }
                >
                    Directorio
                </Button>
            </Group>
        </header>
    )
}