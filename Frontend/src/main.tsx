// Styles
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import '@mantine/tiptap/styles.css';
import '@mantine/carousel/styles.css';
import '@/styles/globals.css'
import '@/styles/variables.css';

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

import { mantineTheme } from "./theme/theme.ts";
import { SettingsLoader } from "./SettingsLoader.tsx";
import { Notifications } from '@mantine/notifications';
import { useSettingStore } from "./features/index.ts";

function Root() {
    const { color, theme } = useSettingStore()

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
