import { useEffect } from "react"
import { useSettingsStore } from "./store/settingsStore"

export const SettingsLoader = () => {
    const loadSettings = useSettingsStore((state) => state.loadSettings);

    useEffect(() => {
        loadSettings()
    }, [])

    return null
}