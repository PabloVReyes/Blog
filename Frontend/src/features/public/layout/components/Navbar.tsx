import { Box, Code, Collapse, Group, ScrollArea, Text, UnstyledButton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconChevronRight } from "@tabler/icons-react";
import { useSettingStore } from "@/features/settings/store/settings/settingStore";
import * as TablerIcons from "@tabler/icons-react";
import { type IconProps } from "@tabler/icons-react";

// --- Tipos ---
interface TreeItem {
    id: any;
    children: TreeItem[];
    collapsed?: boolean;
    label?: string;
    icon?: string;
    link?: string;
}

interface MenuItem {
    id: any;
    label: string;
    icon: string;
    link?: string;
    children: MenuItem[];
}

// --- LinksGroup ---
type TablerIconComponent = React.FC<IconProps>;

export const LinksGroup = ({ icon, label, link, children }: MenuItem) => {
    const IconComponent =
        TablerIcons[icon as keyof typeof TablerIcons] as unknown as TablerIconComponent;
    const location = useLocation();
    const pathname = location.pathname;

    const hasLinks = children.length > 0;

    const groupActive =
        (link && pathname === link) ||
        (hasLinks && children.some((l) => pathname === (l.link || "")));

    const [opened, setOpened] = useState(groupActive);

    useEffect(() => {
        setOpened(groupActive);
    }, [pathname]);

    const items = children.map((child) => {
        const isActive = pathname === (child.link || "");
        return (
            <Link
                to={child.link || "/"}
                className={`link ${isActive ? "active-link" : ""}`}
                data-active={isActive || undefined}
                key={child.id}
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
                onClick={() => setOpened((o) => !o)}
                className="control"
                data-active={groupActive || undefined}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 50,
                    width: "100%",
                    padding: "0 16px",
                }}
            >
                <Box style={{ display: "flex", alignItems: "center" }}>
                    <IconComponent size={20} stroke={2} />
                    <Box ml="md">{label}</Box>
                </Box>
                {hasLinks && (
                    <IconChevronRight
                        className="chevron"
                        stroke={1.5}
                        size={16}
                        style={{
                            transform: opened ? "rotate(-90deg)" : "none",
                            transition: "transform 0.2s ease",
                        }}
                    />
                )}
            </UnstyledButton>

            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
};

// --- Función de mapeo ---
const mapTreeToMenu = (items: TreeItem[]): MenuItem[] =>
    items.map((item) => ({
        id: item.id,
        label: item.label || item.id,
        icon: item.icon || 'IconCircle',
        link: item.link ? `/${item.link.replace(/^\/?/, "")}` : "",
        children: item.children ? mapTreeToMenu(item.children) : [],
    }));

// --- Navbar ---
export const Navbar = () => {
    const { menu, title } = useSettingStore();
    const home: any = [
        {
            id: 'inicio',
            label: 'Inicio',
            icon: 'IconHome',
            link: "/",
        },
        ...menu
    ]

    const menuItems = mapTreeToMenu(home);

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
                    {menuItems.map((item) => (
                        <LinksGroup {...item} key={item.id} />
                    ))}
                </div>
            </ScrollArea>
        </nav>
    );
};
