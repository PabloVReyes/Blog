import { useEffect } from "react"
import { useSettingStore } from "./features"
import { getApiAssetUrl } from "@/utils/apiUrl"

export const SettingsLoader = () => {
    const loadSettings = useSettingStore((state) => state.loadSettings)
    const favicon = useSettingStore((state) => state.favicon)

    useEffect(() => {
        loadSettings()
    }, [loadSettings])

    useEffect(() => {
        if (!favicon) return

        const faviconUrl = getApiAssetUrl(favicon)

        let link =
            document.querySelector<HTMLLinkElement>("link[rel='icon']") ||
            document.createElement("link")

        link.type = "image/x-icon"
        link.rel = "icon"
        link.href = faviconUrl

        if (!link.parentNode) {
            document.head.appendChild(link)
        }
    }, [favicon])

    return null
}