import { useRoutes } from "react-router-dom"
import { useEffect } from "react"
import { useMantineColorScheme } from "@mantine/core";
import { useSettingStore } from "@/shared";
import { routes } from "./routes/routes";

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
        document.title = title ? title : 'Sin título';

        if (favicon) {
            updateFavicon(`${import.meta.env.VITE_API_URL}${favicon}`);
        }
    }, [title])

    useEffect(() => {
        setColorScheme(theme);

    }, [theme])

    const routing = useRoutes(routes)
    return routing
}