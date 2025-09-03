import { useEffect } from "react"
import { useSettingsStore } from "./store/settingsStore"

export const SettingsLoader = () => {
    const loadSettings = useSettingsStore((state) => state.loadSettings);
    const favicon = useSettingsStore((state) => state.favicon);

    useEffect(() => {
        loadSettings()

        if (favicon) {
            let link =
                document.querySelector<HTMLLinkElement>("link[rel*='icon']") ||
                document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "shortcut icon";
            link.href = favicon;
            document.head.appendChild(link);
        }
    }, [])

    return null
}