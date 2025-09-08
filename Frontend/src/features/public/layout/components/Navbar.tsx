import { Box, Code, Collapse, Group, ScrollArea, Text, UnstyledButton } from "@mantine/core"
import { paths } from "../paths"
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconChevronRight } from "@tabler/icons-react";

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

    const hasLinks = Array.isArray(links);

    const isGroupOpened = pathname.startsWith(`${link}`) || (link === '' && pathname === '/')

    const [opened, setOpened] = useState(isGroupOpened);

    useEffect(() => {
        setOpened(isGroupOpened)
    }, [pathname, link])

    const items = (hasLinks ? links : []).map((child) => {
        const isActive = child.link === pathname;

        return (
            <Link
                to={child.link}
                className="link"
                data-active={isActive || undefined}
            >
                {child.label}
            </Link>
        )
    })

    const groupActive = hasLinks
        ? links.some((l) => l.link === pathname)
        : pathname === `/${link}` || (link === '' && pathname == '/')

    return (
        <>
            <UnstyledButton
                onClick={() => setOpened((o) => !o)}
                className="control"
                data-active={groupActive || undefined}
            >
                <Group justify="space-between" gap={0}>
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Icon size={20} stroke={2} />
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className="chevron"
                            stroke={1.5}
                            size={16}
                            style={{ transform: opened ? 'rotate(-90deg)' : 'none', transition: 'transform 0.2s ease' }}
                        />
                    )}
                </Group>
            </UnstyledButton>

            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    )
}

export const Navbar = () => {
    const links = paths.map((item) => <LinksGroup {...item} key={item.label} />)

    return (
        <nav className="navbar">
            <div className="header">
                <Group justify="space-between">
                    <Text>Blog</Text>
                    <Code fw={700}>Beta</Code>
                </Group>
            </div>

            <ScrollArea className="links">
                <div>{links}</div>
            </ScrollArea>
        </nav>
    )
}