import { useRoutes } from "react-router-dom"
import { useEffect } from "react"
import { useMantineColorScheme } from "@mantine/core";
import { routes } from "./routes/routes";
import { useSettingStore } from "./features";
import { getApiAssetUrl } from "./utils";

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
    const { title, favicon, theme } = useSettingStore()
    const { setColorScheme } = useMantineColorScheme();

    useEffect(() => {
        document.title = title || 'Sin titulo'
    }, [title])

    useEffect(() => {
        const faviconUrl = getApiAssetUrl(favicon)
        if (faviconUrl) updateFavicon(faviconUrl)
    }, [favicon])

    useEffect(() => {
        setColorScheme(theme);
    }, [theme])

    const routing = useRoutes(routes)
    return routing
}