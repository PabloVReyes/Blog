import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@/styles/globals.css";
import "@/styles/variables.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

import { mantineTheme } from "./theme/theme";
import { SettingsLoader } from "./SettingsLoader";
import { Notifications } from "@mantine/notifications";
import { useSettingStore } from "./features";

function Root() {
    const { color, theme, hasHydrated } = useSettingStore();

    // 🔥 BLOQUEO CRÍTICO
    if (!hasHydrated) {
        return null; // o loader
    }

    return (
        <MantineProvider
            theme={mantineTheme(color)}
            defaultColorScheme={theme}
        >
            <Notifications position="bottom-left" />
            <BrowserRouter>
                <SettingsLoader />
                <App />
            </BrowserRouter>
        </MantineProvider>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Root />
    </StrictMode>
);