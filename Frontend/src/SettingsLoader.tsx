import { useEffect } from "react"
import { useSettingStore } from "./features"

export const SettingsLoader = () => {
    const loadSettings = useSettingStore((state) => state.loadSettings)

    useEffect(() => {
        loadSettings()
    }, [loadSettings])

    return null
}