import { useEffect } from "react";
import { useMantineColorScheme } from "@mantine/core";
import { useSettingStore } from "@/features";
import { getApiAssetUrl, updateFavicon } from "@/utils";
import { useAppStore } from "@/stores";

export const useDocumentMeta = () => {
    const { title, favicon, theme } = useSettingStore();
    const { setColorScheme } = useMantineColorScheme();
    const { rateLimit } = useAppStore();

    useEffect(() => {
        // --- MANEJO DE TEMA ---
        setColorScheme(theme);

        // --- MANEJO DE FAVICON Y TÍTULO ---
        if (rateLimit.active) {
            updateFavicon("/favicon-error.ico");

            const endTime = Date.now() + rateLimit.retryAfter * 1000;
            const interval = setInterval(() => {
                const remaining = Math.ceil((endTime - Date.now()) / 1000);
                if (remaining <= 0) {
                    clearInterval(interval);
                    return;
                }
                document.title = `Sistema no disponible (${remaining}s)`;
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        } else {
            // Estado Normal
            document.title = title || "Sistema";
            const faviconUrl = getApiAssetUrl(favicon);
            if (faviconUrl) updateFavicon(faviconUrl);
        }
    }, [title, favicon, theme, rateLimit.active, rateLimit.retryAfter, setColorScheme]);
};