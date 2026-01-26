import { useLocation } from "react-router-dom"
import { paths } from "@/paths";
import styles from "./Sidebar.module.css"
import { Code, Group, ScrollArea, Text } from "@mantine/core";
import { useSettingStore } from "@/shared/store";
import { mapTreeToMenu } from "./utils";
import { LinksGroup } from "./LinksGroup";

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
        {
            id: "quienes-somos",
            label: "Quienes Somos",
            icon: "IconUsers",
            link: "/quienes-somos",
            children: [
                {
                    id: "filosofia-organizacional",
                    label: "Filosofia Organizacional",
                    icon: "IconUsers",
                    link: "/quienes-somos/filosofira-organizacional",
                },
                {
                    id: "codigos-de-etica",
                    label: "Códigos Ético Conductuales",
                    icon: "IconUsers",
                    link: "/quienes-somos/codigos-de-etica",
                }
            ]
        },
        {
            id: 'sistemas',
            label: 'Sistemas de Consulta',
            icon: 'IconSearch',
            link: "/sistemas-de-consulta",
        },
        {
            id: "normas-oficiales",
            label: "Normas Oficiales",
            icon: "IconFileText",
            link: "/normas-oficiales"
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