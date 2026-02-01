import { Button, Group, Kbd } from "@mantine/core"
import styles from "./Header.module.css"
import { IconBook, IconSearch } from "@tabler/icons-react"
import { useHotkeys, useOs } from "@mantine/hooks"
import { useModalStore } from "@/shared"
import { Search } from "./Search"
import { Directory } from "./Directory"
import { useNavigate } from "react-router-dom"

interface Props {
    expanded: boolean;
}

export const Header = ({ expanded }: Props) => {
    const os = useOs();
    const { openModal } = useModalStore()
    const navigate = useNavigate();

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
        ]
    ])

    return (
        <header className={styles.header}>
            <Group justify="space-between" h="100%">
                <Button
                    ml={"xs"}
                    variant="subtle"
                    onClick={handleSearch}
                    className={styles.search}
                    leftSection={
                        <IconSearch />
                    }
                    rightSection={
                        expanded &&
                        <div dir="ltr">
                            <Kbd className={styles.kbd} size={"xs"}>{os !== 'macos' ? "CTRL" : "COMMAND"}</Kbd> + <Kbd className={styles.kbd} size={"xs"}>K</Kbd>
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
                        expanded &&
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