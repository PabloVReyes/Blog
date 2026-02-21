import { Box } from "@mantine/core";
import styles from "./Layout.module.css";
import { useEffect, useState, useRef } from "react"; // Añadido useRef
import { useMediaQuery } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { Header, Modal, Settings, Sidebar } from "./components";

export const Layout = () => {
    const isMobile = useMediaQuery("(max-width: 780px)");
    const [mobileOpen, setMobileOpen] = useState(false);
    
    // 1. Referencia al contenedor que tiene 'overflow: auto'
    const viewportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
    }, [mobileOpen]);

    useEffect(() => {
        if (isMobile) setMobileOpen(false);
    }, [isMobile]);

    const toggleSidebar = () => {
        setMobileOpen(prev => !prev);
    };

    return (
        <Box className={styles.layout}>
            {isMobile && mobileOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <Box
                className={`
                    ${styles.sidebar}
                    ${!isMobile ? styles.sidebarDesktop : ""}
                    ${isMobile && mobileOpen ? styles.sidebarMobileOpen : ""}
                `}
            >
                <Sidebar />
            </Box>

            <Box className={styles.content}>
                <Header
                    toggleSidebar={toggleSidebar}
                    mobileOpen={mobileOpen}
                    isMobile={isMobile}
                />

                {/* 2. Pasamos la referencia a Settings */}
                <Settings scrollContainer={viewportRef} />
                
                <Modal />

                {/* 3. Asignamos la ref al elemento main */}
                <main className={styles.main} ref={viewportRef}>
                    <Outlet />
                </main>
            </Box>
        </Box>
    );
};