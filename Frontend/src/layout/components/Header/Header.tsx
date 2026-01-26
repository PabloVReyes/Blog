import { Button, Group, Kbd } from "@mantine/core"
import styles from "./Header.module.css"
import { IconBook, IconSearch } from "@tabler/icons-react"
import { useHotkeys, useOs } from "@mantine/hooks"
import { useModalStore } from "@/shared"
import { Search } from "./Search"
import { Directory } from "./Directory"

export const Header = () => {
    const os = useOs();
    const { openModal } = useModalStore()

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

    useHotkeys([
        [
            os === 'macos' ? 'mod+k' : 'ctrl+k',
            handleSearch
        ],
        [
            os === 'macos' ? 'mod+shift+d' : "ctrl+shift+d",
            handleDirectory
        ]
    ])

    return (
        <header className={styles.header}>
            <Group justify="space-between" h="100%">
                <Button
                    variant="subtle"
                    onClick={handleSearch}
                    className={styles.search}
                    leftSection={
                        <IconSearch />
                    }
                    rightSection={
                        <div dir="ltr">
                            <Kbd c="green" size={"xs"}>{os !== 'macos' ? "CTRL" : "COMMAND"}</Kbd> + <Kbd c="green" size={"xs"}>K</Kbd>
                        </div>
                    }
                >
                    Buscar
                </Button>

                <Button
                    mr={"sm"}
                    onClick={handleDirectory}
                    variant="subtle"
                    className={styles.search}
                    leftSection={
                        <IconBook />
                    }
                    rightSection={
                        <div dir="ltr">
                            <Kbd c="green" size={"xs"}>{os !== 'macos' ? "CTRL" : "COMMAND"}</Kbd> + <Kbd c="green" size={"xs"}>SHIFT</Kbd> + <Kbd c="green" size={"xs"}>D</Kbd>
                        </div>
                    }
                >
                    Directorio
                </Button>
                {/* <p>Hola</p> */}
                {/* <p>Hola</p> */}
            </Group>
        </header>
    )
}