import { useSettingStore } from "@/features/settings/store"
import { mapTreeToMenu } from "@/shared/components/Sidebar/BaseSidebar/utils"
import { useLocation } from "react-router-dom"
import { paths } from "@/paths";
import styles from "./BaseSidebar.module.css"
import { Code, Group, ScrollArea, Text } from "@mantine/core";
import { LinksGroup } from "./components";

export const BaseSidebar = () => {
    const { title, menu } = useSettingStore()
    const { pathname } = useLocation()

    const home: any = [
        {
            id: 'inicio',
            label: 'Inicio',
            icon: 'IconHome',
            link: "/",
        },
        ...menu
    ]

    const isPrivate = pathname.startsWith("/administration")

    const menuItems: any = isPrivate ? paths : mapTreeToMenu(home)

    return (
        <nav className={styles.sidebar}>
            <div className={styles.sidebarMain}>
                <Group className={styles.header} justify="space-between">
                    <Text>{title ? title : "Sin título"}</Text>
                    <Code fw={700} className={styles.version}>
                        Beta
                    </Code>
                </Group>
            </div>

            <ScrollArea className={styles.links}>
                <div className={styles.linksInner}>
                    {menuItems.map((item: any) => (
                        <LinksGroup {...item} key={item.label} />
                    ))}
                </div>
            </ScrollArea>
        </nav>
    );
}