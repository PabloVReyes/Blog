import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { useMantineColorScheme } from "@mantine/core";
import { routes } from "./routes/routes";
import { RateLimitScreen, useSettingStore } from "./features";
import { getApiAssetUrl } from "./utils";
import { useAppStore } from "@/stores/appStore";

// favicon control
let originalFavicon: string | null = null;

const updateFavicon = (url: string) => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;

    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }

    if (link.href !== url) {
        link.href = url;
    }
};

const saveFavicon = () => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link && !originalFavicon) {
        originalFavicon = link.href;
    }
};

export const App = () => {
    const { title, favicon, theme } = useSettingStore();
    const { setColorScheme } = useMantineColorScheme();
    const { rateLimit } = useAppStore();
    const routing = useRoutes(routes);

    // =========================
    // TITLE
    // =========================
    useEffect(() => {
        if (!rateLimit.active) {
            document.title = title || "Sin título";
            return;
        }

        const endTime = Date.now() + rateLimit.retryAfter * 1000;

        const interval = setInterval(() => {
            const remaining = Math.ceil((endTime - Date.now()) / 1000);

            if (remaining <= 0) {
                clearInterval(interval);
                return;
            }

            document.title = `Sistema no disponible (${remaining}s)`;
        }, 1000);

        return () => clearInterval(interval);
    }, [rateLimit.active, rateLimit.retryAfter, title]);

    // =========================
    // FAVICON
    // =========================
    useEffect(() => {
        if (rateLimit.active) {
            saveFavicon();
            updateFavicon("/favicon-error.ico");
            return;
        }

        if (originalFavicon) {
            updateFavicon(originalFavicon);
            return;
        }

        const faviconUrl = getApiAssetUrl(favicon);
        if (faviconUrl) updateFavicon(faviconUrl);
    }, [favicon, rateLimit.active]);

    // =========================
    // THEME
    // =========================
    useEffect(() => {
        setColorScheme(theme);
    }, [theme, setColorScheme]);

    if (rateLimit.active) {
        return <RateLimitScreen />;
    }

    return routing;
};