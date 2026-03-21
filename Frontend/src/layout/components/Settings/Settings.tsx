import {
    Affix,
    Stack,
} from "@mantine/core";
import { useEffect, useState, type RefObject } from "react";
import { ScrollButtons } from "./ScrollButtons";
import { KeyboardShortcutsMenu } from "./KeyboardShortcutsMenu";
import { CatAssistant } from "./CatAssistant";
import { OfflineOverlay } from "./OfflineOverlay";
import { IdleOverlay } from "./IdleOverlay";

interface SettingsProps {
    scrollContainer: RefObject<HTMLDivElement | null>;
}

export const Settings = ({ scrollContainer }: SettingsProps) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const disableIdleDetector = import.meta.env.VITE_DISABLE_IDLE_DETECTOR === 'true'

    const [menuOpened, setMenuOpened] = useState(false);
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(false);

    /* ================= SCROLL ================= */
    useEffect(() => {
        const container = scrollContainer.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;

            setShowTop(scrollTop > 150);
            setShowBottom(scrollTop + clientHeight < scrollHeight - 100);
        };

        container.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => container.removeEventListener("scroll", handleScroll);
    }, [scrollContainer]);

    /* ================= Conexión ================= */
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <Affix position={{ bottom: 20, right: 20 }} zIndex={1000}>
            <Stack gap="xs" align="center">
                <ScrollButtons
                    showTop={showTop}
                    showBottom={showBottom}
                    scrollContainer={scrollContainer}
                />

                <KeyboardShortcutsMenu
                    onOpen={() => setMenuOpened(true)}
                    onClose={() => setMenuOpened(false)}
                />

                <CatAssistant menuOpened={menuOpened} />
            </Stack>

            {/* OFFLINE */}
            <OfflineOverlay isOnline={isOnline} />
            <IdleOverlay
                isOnline={isOnline}
                disableIdleDetector={disableIdleDetector}
            />
        </Affix>
    );
};

// 490 lineas -> 83 lineas