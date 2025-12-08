import { Box, Code, Collapse, Group, ScrollArea, Text, UnstyledButton } from "@mantine/core";
import { paths } from "../paths";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconChevronRight } from "@tabler/icons-react";
import { useSettingStore } from "@/store/settingStore";

interface Props {
    link?: string;
    icon: React.FC<any>;
    label: string;
    links?: {
        label: string;
        link: string
    }[];
}

export const LinksGroup = ({ icon: Icon, label, links, link }: Props) => {
    const location = useLocation();
    const pathname = location.pathname;

    const hasLinks = Array.isArray(links) && links.length > 0;

    // ✅ activo si el padre o alguno de los hijos coincide con la ruta
    const groupActive =
        (link && pathname === link) ||
        (hasLinks && links!.some((l) => pathname === l.link));

    const [opened, setOpened] = useState(groupActive);

    useEffect(() => {
        setOpened(groupActive);
    }, [pathname]);

    // Renderiza los hijos
    const items = (hasLinks ? links! : []).map((child) => {
        const isActive = pathname === child.link;
        return (
            <Link
                key={child.label}
                to={child.link}
                className={`link ${isActive ? "active-link" : ""}`}
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
                className="control"
                data-active={groupActive || undefined}
                onClick={() => !link && hasLinks && setOpened((o) => !o)}
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
                    <Icon size={20} stroke={2} />
                    <Box>{label}</Box>
                </Box>

                {/* chevron al extremo */}
                {hasLinks && (
                    <IconChevronRight
                        className="chevron"
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

export const Navbar = () => {
    const {title} = useSettingStore()

    return (
        <nav className="navbar">
            <div className="header">
                <Group justify="space-between">
                    <Text>{title}</Text>
                    <Code fw={700}>Beta</Code>
                </Group>
            </div>

            <ScrollArea className="links">
                <div>
                    {paths.map((item) => (
                        <LinksGroup {...item} key={item.label} />
                    ))}
                </div>
            </ScrollArea>
        </nav>
    );
};
