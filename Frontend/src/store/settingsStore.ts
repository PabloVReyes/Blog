import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSettings, updateSettings } from "@/api/settings";
import { colorMap } from "@/utils/colors";

type ThemeType = "auto" | "dark" | "light";

interface SettingState {
    settings: Record<string, string>;
    title: string;
    color: string;
    theme: ThemeType;
    favicon?: string;
    setSettings: (settings: Record<string, string>) => void;
    setTitle: (title: string) => void;
    setColor: (color: string) => void;
    setTheme: (theme: ThemeType) => void;
    setFavicon: (url: string) => void;
    loadSettings: () => Promise<void>;
    saveSetting: (name: string, value: string) => Promise<void>;
}

export const useSettingsStore = create<SettingState>()(
    persist(
        (set, get) => ({
            settings: {},
            title: "Blog",
            color: "blue",
            theme: "auto",
            favicon: undefined,

            // Actualiza settings, color y theme desde un objeto recibido
            setSettings: (settings) => {
                const themeFromDB: ThemeType = ["auto", "dark", "light"].includes(settings.theme)
                    ? (settings.theme as ThemeType)
                    : "auto";

                const colorFromDB = settings.color && colorMap[settings.color]
                    ? settings.color
                    : "blue";

                set({
                    settings,
                    title: settings.title,
                    favicon: settings.favicon,
                    color: colorFromDB,
                    theme: themeFromDB,
                });
            },

            setTitle: (title) => set({ title }),

            // Cambia color y actualiza store
            setColor: (color) => {
                if (colorMap[color]) {
                    set({ color });
                }
            },

            // Cambia theme y actualiza store
            setTheme: (theme: ThemeType) => set({ theme }),

            // Actualizar el icono
            setFavicon: (url) => ({ favicon: url }),

            // Cargar settings desde API
            loadSettings: async () => {
                try {
                    const settingsFromAPI = await getSettings();
                    console.log(settingsFromAPI)
                    get().setSettings(settingsFromAPI);
                } catch (error) {
                    console.error("Error cargando configuraciones:", error);
                }
            },

            // Guardar un setting individual en backend
            saveSetting: async (name: string, value: string) => {
                try {
                    await updateSettings(name, value);
                    // await updateSettings(name, value);
                    // Actualizar en store local
                    const newSettings = { ...get().settings, [name]: value };
                    get().setSettings(newSettings);
                } catch (error) {
                    console.error("Error guardando configuración:", error);
                }
            },
        }),
        {
            name: "settings-storage", // nombre en localStorage
        }
    )
);
