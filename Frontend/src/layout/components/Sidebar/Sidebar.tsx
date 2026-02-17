import { useLocation } from "react-router-dom"
import styles from "./Sidebar.module.css"
import { Code, Group, ScrollArea, Text } from "@mantine/core";
import { mapTreeToMenu } from "./utils";
import { LinksGroup } from "./LinksGroup";
import { useSettingStore } from "@/features";
import { paths } from "@/paths";
import { useEffect, useState } from "react";
import { fetchSystems } from "@/layout/api";

export const Sidebar = () => {
    const { title, menu } = useSettingStore()
    const { pathname } = useLocation()
    const [systems, setSystems] = useState<any[]>([])

    useEffect(() => {
        fetchSystems()
            .then(setSystems)
    }, [])

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
                    link: "/filosofira-organizacional",
                },
                {
                    id: "codigos-de-etica",
                    label: "Códigos Ético Conductuales",
                    icon: "IconUsers",
                    link: "/codigos-de-etica",
                }
            ]
        },
        {
            id: 'sistemas',
            label: 'Sistemas de consulta',
            icon: 'IconSearch',
            link: "/sistemas-de-consulta",
            children: systems.map((system) => ({
                id: system.id,
                label: system.acronym ? system.acronym : system.name,
                icon: "IconDatabase",
                type: system.type,
                link: `${system.url}`,
            }))
        },
        {
            id: "normas-oficiales",
            label: "Normas Oficiales",
            icon: "IconFileText",
            link: "/normas-oficiales"
        },
        {
            id: "disposiciones-juridicas-administrativas",
            label: "Disposiciones Juridicas Administrativas",
            icon: "IconGavel",
            link: "/disposiciones-juridicas-administrativas"
        },
        {
            id: "descargas",
            label: "Descarga de Información",
            icon: "IconDownload",
            link: "/descargas",
            children: [
                {
                    id: "direccion",
                    label: "Dirección",
                    icon: "IconDownload",
                    link: "/direccion",
                }
            ]
        },
        {
            id: "macroproceso",
            label: "Macroproceso",
            icon: "IconGitBranch",
            link: "/macroproceso"
        },
        ...menu
    ]

    const isPrivate = pathname.startsWith("/administracion")

    const menuItems: any = isPrivate ? paths : mapTreeToMenu(home)

    return (
        <nav className={styles.sidebar}>
            <div className={styles.sidebarMain}>
                <Group className={styles.header} justify="space-between">
                    <Text>{title ? title : "Sin título"}</Text>
                    <Code fw={700} className={styles.version}>
                        {isPrivate ? "Admin" : "Beta"}
                    </Code>
                </Group>
            </div>

            <ScrollArea className={styles.links}>
                <div className={styles.linksInner}>
                    {menuItems.map((item: any) => (
                        <LinksGroup {...item} isPrivate={isPrivate} key={item.label} />
                    ))}
                </div>
            </ScrollArea>
        </nav>
    );
}