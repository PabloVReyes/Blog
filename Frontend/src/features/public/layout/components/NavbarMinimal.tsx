import { Center, Menu, ScrollArea, Stack, Text, UnstyledButton } from "@mantine/core"
import { IconHome2, IconLogout } from "@tabler/icons-react"
import { Link, useLocation } from "react-router-dom"
import { paths } from "../paths";

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    active?: boolean;
    onClick?: () => void;
    link: string
    links: any[]
}

const NavbarLink = ({ icon: Icon, label, link, links }: NavbarLinkProps) => {
    const location = useLocation()
    const pathname = location.pathname

    const hasLinks = Array.isArray(links);

    const activeLink = pathname.split("/").slice(0, -1).join("/"); 

    const items = (hasLinks ? links : []).map((link) => (
        <Menu.Item
            className="navbar-links-minimal"
            component={Link}
            to={link.link}
            data-active={link.link === pathname || undefined}
            key={link.label}
        >
            {link.label}
        </Menu.Item>
    ));

    return (
        <Menu position="right" withArrow offset={15} trigger="hover" openDelay={100} closeDelay={100}>
            <Menu.Target>
                <UnstyledButton className="navbar-link-minimal" data-active={link === activeLink || undefined}>
                    <Icon size={20} stroke={2} />
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>
                    {label}
                </Menu.Label>
                {items}
            </Menu.Dropdown>
        </Menu>
    );
}

export const NavbarMinimal = () => {
    const links = paths.map((link) => (
        <NavbarLink
            {...link}
            key={link.label}
        />
    ));

    return (
        <nav className="navbar-minimal">
            <Center className="header">
                <Text w={40}>B</Text>
            </Center>

            <div className="navbar-main-minimal">
                <Stack justify="center" gap={0}>
                    <ScrollArea>
                        {links}
                    </ScrollArea>
                </Stack>
            </div>

            <Stack justify="center" gap={0} className="navbarMinimallink">
                <IconLogout />
            </Stack>
        </nav>
    )
}