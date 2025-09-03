import { useRoutes } from "react-router-dom"
import { routes } from "@/routes/routes"
import { useEffect } from "react"
import { useSettingsStore } from "./store/settingsStore"
import { useMantineColorScheme } from "@mantine/core";

const updateFavicon = (url: string) => {
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = url;
};

export const App = () => {
  const { title, favicon, theme } = useSettingsStore()
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    document.title = title;

    if (favicon) {
      updateFavicon(`http://localhost:3001${favicon}`);
    }
  }, [title])

  useEffect(() => {
        setColorScheme(theme);

  }, [theme])

  const routing = useRoutes(routes)
  return routing
}