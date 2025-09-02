// main.tsx
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

import "./styles.css";
import { mantineTheme } from "./theme/theme.ts";
import { useSettings } from "./hooks/useSettings.ts";

function Root() {
  const settings = useSettings()

  return (
    <MantineProvider
      theme={mantineTheme(settings?.color)}
      defaultColorScheme="auto"
    >
      <BrowserRouter>
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
