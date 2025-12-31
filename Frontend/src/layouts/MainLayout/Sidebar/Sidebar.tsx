import { useSettingStore } from "@/features/settings/store/settings/settingStore";
import { Code, Group, ScrollArea, Text } from "@mantine/core";
import { useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css"
import { LinksGroup } from "./LinksGroup";
import { paths } from "@/paths";
import type { MenuItem } from "@/types/menu";

const mapTreeToMenu = (items: any[]): MenuItem[] =>
    items.map((item) => ({
        id: item.id,
        label: item.label || item.id,
        icon: item.icon || 'IconCircle',
        link: item.link ? `/${item.link.replace(/^\/?/, "")}` : "",
        children: item.children ? mapTreeToMenu(item.children) : [],
    }));

export const Sidebar = () => {
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