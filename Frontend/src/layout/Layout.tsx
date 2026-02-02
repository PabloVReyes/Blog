import { Box } from "@mantine/core";
import styles from "./Layout.module.css";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { Header, Modal, Settings, Sidebar } from "./components";

export const Layout = () => {
    const isMobile = useMediaQuery("(max-width: 780px)");
    const [expanded, setExpanded] = useState(() => !isMobile);

    useEffect(() => {
        setExpanded(!isMobile);
    }, [isMobile]);

    return (
        <Box className={styles.layout}>

            {/* Sidebar */}
            <Box
                className={`
          ${styles.sidebar}
          ${expanded ? styles.sidebarExpanded : styles.sidebarCollapsed}
          ${isMobile ? styles.sidebarHidden : ""}
        `}
            >
                <Box
                    className={`
            ${styles.sidebarLayer}
            ${expanded ? styles.layerVisible : styles.layerHidden}
          `}
                >
                    <Sidebar />
                </Box>
            </Box>

            {/* Content */}
            <Box className={styles.content}>
                <Header
                    expanded={expanded}
                />
                <Settings />
                <Modal />
                <main className={styles.main}>
                    <Outlet />
                </main>
            </Box>
        </Box>
    );
};
