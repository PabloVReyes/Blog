import { useLocation, useNavigate } from "react-router-dom"
import classes from "./Sidebar.module.css"
import { Code, Group, ScrollArea, Text } from "@mantine/core";
import { mapTreeToMenu } from "./utils";
import { LinksGroup } from "./LinksGroup";
import { useSettingStore } from "@/features";
import { paths } from "@/paths";
import { useEffect, useState } from "react";
import { fetchDownloads, fetchSystems } from "@/layout/api";
import { UserButton } from "./UserButton";
import { useAuthStore } from "@/features/auth/store";
import type { MenuItem } from "./types";
import type { FileData } from "@/types";
import { Notify } from "@/ui";

interface System {
    id: string | number;
    name: string;
    acronym?: string;
    type?: string;
    url: string;
    file: FileData | null;
}

interface DownloadArea {
    id: string | number;
    name: string;
    icon: string;
    slug: string;
}

export const Sidebar = () => {
    const { title } = useSettingStore()
    const { pathname } = useLocation()
    const [systems, setSystems] = useState<System[]>([])
    const [downloads, setDownloads] = useState<DownloadArea[]>([])
    const user = useAuthStore(state => state.user)
    const logout = useAuthStore((s) => s.logout)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    useEffect(() => {
        fetchSystems()
            .then(setSystems)
            .catch((error: unknown) => {
                Notify({
                    type: "error",
                    title: "Error al obtener sistemas de consulta",
                    message: error instanceof Error ? error.message : "Error desconocido"
                });
            });
        fetchDownloads()
            .then(setDownloads)
            .catch((error: unknown) => {
                Notify({
                    type: "error",
                    title: "Error al obtener áreas de descarga",
                    message: error instanceof Error ? error.message : "Error desconocido"
                });
            });
    }, [])

    const home: MenuItem[] = [
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
                    label: "Filosofía Organizacional",
                    icon: "IconUsers",
                    link: "/filosofia-organizacional",
                },
                {
                    id: "codigos-de-etica",
                    label: "Códigos Éticos Conductuales",
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
                file: system?.file,
                link: `${system.url}`,
            }))
        },
        {
            id: "uveh",
            label: "Vigilancia Epidemiológica",
            icon: "IconVirus",
            link: "/uveh"
        },
        {
            id: "normas-oficiales",
            label: "Normas Oficiales",
            icon: "IconFileText",
            link: "/normas-oficiales"
        },
        {
            id: "disposiciones-juridicas-administrativas",
            label: "Disposiciones Jurídicas Administrativas",
            icon: "IconGavel",
            link: "/disposiciones-juridicas-administrativas"
        },
        {
            id: "certification",
            label: "Certificación",
            icon: "IconAward",
            link: "/certificacion"
        },
        {
            id: "macroproceso",
            label: "Macroproceso",
            icon: "IconGitBranch",
            link: "/macroproceso"
        },
        {
            id: "descargas",
            label: "Descargar Información",
            icon: "IconDownload",
            link: "/descargas",
            children: downloads.map((area: any) => ({
                id: area.id,
                label: area.name,
                icon: area.icon,
                link: `${area.slug}`,
            }))
        },
        {
            id: "vacation",
            label: "Rol Vacacional",
            icon: "IconBeach",
            link: "/rol-vacacional"
        },
    ]

    const isPrivate = pathname.startsWith("/administracion")

    const menuItems = isPrivate ? paths : mapTreeToMenu(home)

    return (
        <nav className={classes.sidebar}>
            <div className={classes.sidebarMain}>
                <Group className={classes.header} justify="space-between">
                    <Text>{title ? title : "Sin título"}</Text>
                    <Code fw={700} className={classes.version}>
                        {isPrivate ? "Admin" : "Beta"}
                    </Code>
                </Group>
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>
                    {menuItems.map((item) => (
                        <LinksGroup
                            {...item}
                            isPrivate={isPrivate}
                            key={`${item.id}-${item.label}`}
                        />
                    ))}
                </div>
            </ScrollArea>

            {isPrivate &&
                <div className={classes.footer}>
                    <UserButton
                        user={user}
                        logout={handleLogout}
                    />
                </div>
            }
        </nav>
    );
}