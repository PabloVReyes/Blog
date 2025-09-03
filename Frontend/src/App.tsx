import { useRoutes } from "react-router-dom"
import { routes } from "@/routes/routes"
import { useEffect } from "react"
import { useSettingsStore } from "./store/settingsStore"

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
  const { title, favicon } = useSettingsStore()

  useEffect(() => {
    document.title = title;

    if (favicon) {
      updateFavicon(`http://localhost:3001${favicon}`);
    }
  }, [title])

  const routing = useRoutes(routes)
  return routing
}