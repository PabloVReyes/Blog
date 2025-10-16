import {
    Center,
    Menu,
    ScrollArea,
    Stack,
    Text,
    UnstyledButton,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { paths } from "../paths";

// --- Tipos reutilizados ---
interface MenuItem {
    id: any;
    label: string;
    icon: React.FC<any>;
    link?: string;
    children: MenuItem[];
}


// --- Componente link para NavbarMinimal ---
const NavbarLink = ({ icon: Icon, label, link, children }: MenuItem) => {
    const location = useLocation();
    const pathname = location.pathname;

    const hasLinks = children.length > 0;

    const isActive =
        (link && pathname === link) ||
        children.some((l) => pathname === (l.link || ""));

    const items = children.map((child) => {
        const childActive = pathname === (child.link || "");
        return (
            <Menu.Item
                className="navbar-links-minimal"
                component={Link}
                to={child.link || "/"}
                data-active={childActive || undefined}
                key={child.id}
            >
                {child.label}
            </Menu.Item>
        );
    });

    return (
        <Menu
            position="right"
            withArrow
            offset={15}
            trigger="hover"
            openDelay={100}
            closeDelay={100}
        >
            <Menu.Target>
                <UnstyledButton
                    component={Link}
                    to={link || "/"}
                    className="navbar-link-minimal"
                    data-active={isActive || undefined}
                >
                    <Icon size={20} stroke={2} />
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>{label}</Menu.Label>
                {hasLinks && items}
            </Menu.Dropdown>
        </Menu>
    );
};

// --- NavbarMinimal ---
export const NavbarMinimal = () => {

    // usamos el mismo mapper que en Navbar
    const mapTreeToMenu = (items: any[]): MenuItem[] =>
        items.map((item) => ({
            id: item.id,
            label: item.label || item.id,
            icon: item.icon || "IconCircle",
            link: item.link ? `/${item.link.replace(/^\/?/, "")}` : "",
            children: item.children ? mapTreeToMenu(item.children) : [],
        }));

    const menuItems = mapTreeToMenu(paths);

    return (
        <nav className="navbar-minimal">
            <Center className="header">
                <Text w={40}>B</Text>
            </Center>

            <div className="navbar-main-minimal">
                <Stack justify="center" gap={0}>
                    <ScrollArea>
                        {menuItems.map((item) => (
                            <NavbarLink {...item} key={item.id} />
                        ))}
                    </ScrollArea>
                </Stack>
            </div>

            <Stack justify="center" gap={0} className="navbarMinimallink">
                <IconLogout />
            </Stack>
        </nav>
    );
};
