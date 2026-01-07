import { Box, Collapse, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css"
import * as TablerIcons from "@tabler/icons-react";
import { type IconProps } from "@tabler/icons-react";

type TablerIconComponent = React.FC<IconProps>;

interface Props {
    link?: string;
    icon: keyof typeof TablerIcons;
    label: string;
    children?: {
        label: string;
        link: string
    }[];
}

export const LinksGroup = ({ icon, label, children, link }: Props) => {
    const IconComponent =
        TablerIcons[icon as keyof typeof TablerIcons] as unknown as TablerIconComponent;

    const location = useLocation();
    const pathname = location.pathname;

    const hasLinks = Array.isArray(children) && children.length > 0;

    const groupActive =
        (link && pathname === link) ||
        (hasLinks && children!.some((l) => pathname === l.link));

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
                to={link || ''}
                className={styles.control}
                data-active={groupActive || undefined}
                onClick={() => !link && hasLinks && setOpened((o: any) => !o)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 50,
                    width: "100%",
                    padding: "0 16px",
                }}
            >
                {/* icono + texto */}
                <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <IconComponent size={20} stroke={2} />
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