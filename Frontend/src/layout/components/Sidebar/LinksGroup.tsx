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
    const hasLink = isPrivate ? (link === "/" ? `/administracion` : `/administracion${link}`) : link

    const IconComponent =
        TablerIcons[icon as keyof typeof TablerIcons] as unknown as TablerIconComponent;

    const location = useLocation();
    const pathname = location.pathname;

    const hasLinks = Array.isArray(children) && children.length > 0;

    const isExactRoot =
        hasLink &&
        (pathname === hasLink || pathname === hasLink + "/");

    const isChildActive =
        hasLinks &&
        children!.some(
            (l) => matchPath({ path: l.link, end: false }, pathname) !== null
        );

    const groupActive = isExactRoot || isChildActive;

    const [opened, setOpened] = useState(groupActive);

    useEffect(() => {
        setOpened(groupActive);
    }, [pathname]);

    // Renderiza los hijos
    const items = (hasLinks ? children! : []).map((child) => {
        const isActive = pathname === child.link;
        return (
            <Link
                key={child.label}
                to={child.link}
                className={styles.link}
                data-active={isActive || undefined}
                style={{ display: "block", padding: "8px 16px" }} // opcional: padding interno
            >
                {child.label}
            </Link>
        );
    });

    return (
        <>
            <UnstyledButton
                component={link ? Link : undefined}
                to={hasLink || ''}
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

            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
};