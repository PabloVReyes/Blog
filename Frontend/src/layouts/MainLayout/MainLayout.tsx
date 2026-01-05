import { Box } from "@mantine/core"
import styles from "./MainLayout.module.css"
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { BaseModal, BaseSidebar } from "@/shared";

export const MainLayout = () => {
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
                    <BaseModal />
                    <BaseSidebar />
                </Box>

                <Box
                    className={`${styles.sidebarLayer} ${expanded ? styles.layerHidden : styles.layerVisible}`}
                >
                    {/* <NavbarMinimal /> */}
                </Box>
            </Box>

            {/* Contenido */}
            <Box className={styles.content}>
                <main className={styles.main}>
                    <Outlet />
                </main>
            </Box>
        </Box>
    )
}