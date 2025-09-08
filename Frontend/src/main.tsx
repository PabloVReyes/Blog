// main.tsx
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import '@mantine/tiptap/styles.css';

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

import "./styles.css";
import { mantineTheme } from "./theme/theme.ts";
import { SettingsLoader } from "./SettingsLoader.tsx";
import { useSettingStore } from "./store/settingStore.ts";

function Root() {
  const { color, theme } = useSettingStore()

  return (
    <MantineProvider
      theme={mantineTheme(color)}
      defaultColorScheme={theme}
    >
      <BrowserRouter>
        <SettingsLoader/>
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
