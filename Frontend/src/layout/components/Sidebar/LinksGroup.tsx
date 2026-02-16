import { Box, Collapse, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./LinksGroup.module.css"
import * as TablerIcons from "@tabler/icons-react";
import { type IconProps } from "@tabler/icons-react";
import { matchPath } from "react-router-dom";
import { downloadSystem } from "@/layout/api";

type TablerIconComponent = React.FC<IconProps>;

interface Props {
    link?: string;
    icon: keyof typeof TablerIcons;
    label: string;
    children?: {
        id: string
        label: string;
        link: string
        type: "page" | "file"
    }[];
    isPrivate: boolean;
}

export const LinksGroup = ({ icon, label, children, link, isPrivate }: Props) => {
    const download = async (id: string) => {
        try {
            const response = await downloadSystem(id)

            const blob = new Blob([response.data], {
                type: "application/pdf",
            });

            const url = window.URL.createObjectURL(blob);

            window.open(url, "_blank");

            // Opcional: liberar memoria después de un tiempo
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);


        } catch (error) {
            console.error("Error al descargar archivo", error);
        }
    };

    const { pathname } = useLocation();

    const hasLinks = Array.isArray(children) && children.length > 0;
    const prefix = isPrivate ? "/administracion" : "";

    // Detectar links externos
    const isExternal = (url?: string) =>
        !!url && /^(https?:\/\/|\/\/|mailto:|tel:)/i.test(url);

    // Une rutas evitando // y errores
    const joinPaths = (...paths: (string | undefined)[]) =>
        "/" +
        paths
            .filter(Boolean)
            .map((p) => p!.replace(/^\/+|\/+$/g, ""))
            .join("/");

    // Link del padre
    const baseLink = link
        ? isExternal(link)
            ? link
            : joinPaths(prefix, link)
        : undefined;

    // Hijos normalizados, concatenando la ruta del padre
    const normalizedChildren = hasLinks
        ? children!.map((c) => ({
            ...c,
            link: isExternal(c.link)
                ? c.link
                : joinPaths(prefix, link, c.link),
        }))
        : [];

    const IconComponent =
        TablerIcons[icon] as unknown as TablerIconComponent;

    const isExactRoot =
        baseLink &&
        !isExternal(baseLink) &&
        (pathname === baseLink || pathname === baseLink + "/");

    const isChildActive =
        hasLinks &&
        normalizedChildren.some(
            (c) =>
                !isExternal(c.link) &&
                matchPath({ path: c.link, end: false }, pathname) !== null
        );

    const groupActive = isExactRoot || isChildActive;

    const [opened, setOpened] = useState(groupActive);

    useEffect(() => {
        setOpened(groupActive);
    }, [groupActive]);

    const parentExternal = isExternal(baseLink);

    const Content = (
        <>
            <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Box style={{ flexShrink: 0 }}>
                    <IconComponent size={20} stroke={2} />
                </Box>
                <Box>{label}</Box>
            </Box>

            {hasLinks && (
                <IconChevronRight
                    className={styles.chevron}
                    size={16}
                    stroke={1.5}
                    style={{
                        transform: opened ? "rotate(-90deg)" : "none",
                        transition: "transform 0.2s",
                    }}
                />
            )}
        </>
    );

    return (
        <>
            {baseLink ? (
                parentExternal ? (
                    <a
                        href={baseLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.control}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                            width: "100%",
                            padding: "12px 16px",
                        }}
                    >
                        {Content}
                    </a>
                ) : (
                    <UnstyledButton
                        component={Link}
                        to={baseLink}
                        className={styles.control}
                        data-active={groupActive || undefined}
                        onClick={() => !link && hasLinks && setOpened((o) => !o)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                            width: "100%",
                            padding: "12px 16px",
                        }}
                    >
                        {Content}
                    </UnstyledButton>
                )
            ) : (
                <UnstyledButton
                    className={styles.control}
                    data-active={groupActive || undefined}
                    onClick={() => hasLinks && setOpened((o) => !o)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                        width: "100%",
                        padding: "12px 16px",
                    }}
                >
                    {Content}
                </UnstyledButton>
            )}

            {hasLinks && (
                <Collapse in={opened}>
                    {normalizedChildren.map((child) => {
                        const external = isExternal(child.link);
                        const isActive = pathname === child.link;

                        // Si es archivo → siempre abrir en nueva pestaña
                        if (child.type === "file") {
                            return (
                                <a
                                    key={child.label}
                                    href={child.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                    onClick={(e) => {
                                        e.preventDefault(); // evitar navegación del <a>
                                        download(child.id); // o el id real que tengas
                                    }}

                                >
                                    {child.label}
                                </a>
                            );
                        }

                        // Si es link externo normal
                        if (external) {
                            return (
                                <a
                                    key={child.label}
                                    href={child.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                >
                                    {child.label}
                                </a>
                            );
                        }

                        // Página interna (react-router)
                        return (
                            <Link
                                key={child.label}
                                to={child.link}
                                className={styles.link}
                                data-active={isActive || undefined}
                            >
                                {child.label}
                            </Link>
                        );
                    })}
                </Collapse>
            )}
        </>
    );
};