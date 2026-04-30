import { Box, Collapse, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import styles from "./LinksGroup.module.css";
import { getTablerIcon } from "@/helpers";
import type { MenuItem } from "./types";
import { useDownloadFile } from "@/hooks";

interface Props {
    id?: string | number;
    link?: string;
    icon?: string;
    label: string;
    children?: MenuItem[]
    isPrivate: boolean;
}

export const LinksGroup = ({
    icon,
    label,
    children,
    link,
    isPrivate,
}: Props) => {
    const { pathname } = useLocation();
    const { view } = useDownloadFile()
    const hasLinks = Array.isArray(children) && children.length > 0;
    const prefix = isPrivate ? "/administracion" : "";
    const isExternal = (url?: string) =>
        !!url && /^(https?:\/\/|\/\/|mailto:|tel:)/i.test(url);
    const joinPaths = (...paths: (string | undefined)[]) =>
        "/" +
        paths
            .filter(Boolean)
            .map((p) => p!.replace(/^\/+|\/+$/g, ""))
            .join("/");

    const baseLink = link
        ? isExternal(link)
            ? link
            : joinPaths(prefix, link)
        : undefined;

    const normalizedChildren = hasLinks
        ? children!.map((c) => ({
            ...c,
            link: isExternal(c.link)
                ? c.link
                : joinPaths(prefix, link, c.link),
        }))
        : [];

    const IconComponent = getTablerIcon(icon)

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

    const groupActive = Boolean(isExactRoot || isChildActive);

    const [opened, setOpened] = useState(groupActive);

    useEffect(() => {
        setOpened(groupActive);
    }, [groupActive]);

    const Content = (
        <>
            <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconComponent size={20} stroke={2} style={{ flex: "0 0 auto" }} />
                <Box style={{ flex: 1, minWidth: 0 }}>{label}</Box>
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
            {/* PARENT */}
            {baseLink && !isExternal(baseLink) ? (
                <UnstyledButton
                    component={Link}
                    to={baseLink}
                    onClick={() => {
                        if (hasLinks) setOpened((o) => !o);
                    }}
                    className={styles.control}
                    data-active={groupActive || undefined}
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
            ) : (
                <UnstyledButton
                    onClick={() => {
                        if (hasLinks) setOpened((o) => !o);
                    }}
                    className={styles.control}
                    data-active={groupActive || undefined}
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

            {/* CHILDREN */}
            {hasLinks && (
                <Collapse expanded={opened}>
                    {normalizedChildren.map((child) => {
                        const external = isExternal(child.link);
                        const isActive = pathname === child.link;

                        if (child.type === "file") {
                            return (
                                <a
                                    key={child.label}
                                    href={child.link}
                                    className={styles.link}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (child.id !== undefined) {
                                            view(child.file?.id ?? "#");
                                        }
                                    }}
                                >
                                    {child.label}
                                </a>
                            );
                        }

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