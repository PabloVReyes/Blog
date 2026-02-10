import { Box, Collapse, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./LinksGroup.module.css"
import * as TablerIcons from "@tabler/icons-react";
import { type IconProps } from "@tabler/icons-react";
import { matchPath } from "react-router-dom";

type TablerIconComponent = React.FC<IconProps>;

interface Props {
    link?: string;
    icon: keyof typeof TablerIcons;
    label: string;
    children?: {
        label: string;
        link: string
    }[];
    isPrivate: boolean;
}

export const LinksGroup = ({ icon, label, children, link, isPrivate }: Props) => {
    const { pathname } = useLocation();

    const hasLinks = Array.isArray(children) && children.length > 0;
    const prefix = isPrivate ? "/administracion" : "";

    // Une rutas evitando // y errores
    const joinPaths = (...paths: (string | undefined)[]) =>
        "/" +
        paths
            .filter(Boolean)
            .map((p) => p!.replace(/^\/+|\/+$/g, ""))
            .join("/");

    // Link del padre
    const baseLink = link ? joinPaths(prefix, link) : undefined;

    // Hijos normalizados, concatenando la ruta del padre
    const normalizedChildren = hasLinks
        ? children!.map((c) => ({
            ...c,
            link: joinPaths(prefix, link, c.link),
        }))
        : [];

    const IconComponent =
        TablerIcons[icon] as unknown as TablerIconComponent;

    const isExactRoot =
        baseLink &&
        (pathname === baseLink || pathname === baseLink + "/");

    const isChildActive =
        hasLinks &&
        normalizedChildren.some(
            (c) => matchPath({ path: c.link, end: false }, pathname) !== null
        );

    const groupActive = isExactRoot || isChildActive;

    const [opened, setOpened] = useState(groupActive);

    useEffect(() => {
        setOpened(groupActive);
    }, [groupActive]);

    return (
        <>
            <UnstyledButton
                component={baseLink ? Link : undefined}
                to={baseLink || ''}
                className={styles.control}
                data-active={groupActive || undefined}
                onClick={() => !link && hasLinks && setOpened((o: any) => !o)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    width: "100%",
                    padding: "12px 16px",
                }}
            >
                {/* icono + texto */}
                <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Box style={{ flexShrink: 0 }}>
                        <IconComponent size={20} stroke={2} />
                    </Box>
                    <Box>{label}</Box>
                </Box>

                {/* chevron al extremo */}
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
            </UnstyledButton>

            {hasLinks && (
                <Collapse in={opened}>
                    {normalizedChildren.map((child) => {
                        const isActive = pathname === child.link;
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