import { Box } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { NavbarMinimal } from "./components/NavbarMinimal";

export const Layout = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [expanded, setExpanded] = useState(!isMobile);

    useEffect(() => {
        setExpanded(!isMobile);
    }, [isMobile]);

    const containerWidth = expanded ? 300 : 80;

    return (
        <Box
            style={{
                display: 'flex',
                position: 'relative',
                height: '100dvh',
                overflow: "hidden"
            }}
        >
            <Box
                style={{
                    width: containerWidth,
                    minWidth: containerWidth,
                    transition: 'width 0.4s ease',
                    overflow: 'hidden',
                    height: '100%',
                    boxShadow: '0 0 10px rgba(0,0,0,0.08)'
                }}
            >
                <Box
                    style={{
                        width: '100%',
                        height: '100%',
                        transition: 'opacity 0.3s ease',
                        position: 'absolute',
                        inset: 0,
                        opacity: expanded ? 1 : 0,
                        pointerEvents: expanded ? 'auto' : 'none',
                    }}
                >
                    <Navbar />
                </Box>

                <Box
                    style={{
                        width: '100%',
                        height: '100%',
                        transition: 'opacity 0.3s ease',
                        position: 'absolute',
                        inset: 0,
                        opacity: expanded ? 0 : 1,
                        pointerEvents: expanded ? 'none' : 'auto',
                    }}
                >
                    <NavbarMinimal/>
                </Box>
            </Box>

            <Box
                style={{
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    overflow: 'auto',
                    position: 'relative',
                }}
            >
                <main style={{ flex: 1, display: 'block', position: 'relative' }}>
                    <Outlet />
                </main>
            </Box>
        </Box>
    )
}