import { useEffect } from "react"
import { useSettingStore } from "./store/settingStore";

export const SettingsLoader = () => {
    const loadSettings = useSettingStore((state) => state.loadSettings);
    const favicon = useSettingStore((state) => state.favicon);

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