import { Box } from "@mantine/core"
import styles from "./Layout.module.css"
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { Header, Modal, Sidebar } from "./components";

export const Layout = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [expanded, setExpanded] = useState(() => !isMobile);

    useEffect(() => {
        setExpanded(!isMobile);
    }, [isMobile]);

    return (
        <Box className={styles.layout}>
            {/* Sidebar */}
            <Box className={`${styles.sidebar} ${expanded ? styles.sidebarExpanded : styles.sidebarCollapsed}`}>
                <Box className={`${styles.sidebarLayer} ${expanded ? styles.layerVisible : styles.layerHidden}`}
                >
                    <Sidebar />
                </Box>

                <Box
                    className={`${styles.sidebarLayer} ${expanded ? styles.layerHidden : styles.layerVisible}`}
                >
                    {/* <NavbarMinimal /> */}
                </Box>
            </Box>

            {/* Contenido */}
            <Box className={styles.content}>
                <Header />
                <Modal/>
                <main className={styles.main}>
                    <Outlet />
                </main>
            </Box>
        </Box>
    )
}