import { create } from "zustand";
import { persist } from "zustand/middleware";
import { colorMap } from "@/utils";
import { getSettings, updateSettings } from "../api";
import type { ThemeType } from "./types";
import { extractErrorMessage } from "@/lib";

interface SettingsState {
    title: string;
    color: string;
    theme: ThemeType;
    favicon: string;

    isLoading: boolean;

    setTitle: (title: string) => void;
    setColor: (color: string) => void;
    setTheme: (theme: ThemeType) => void;
    setFavicon: (url?: string) => void;

    loadSettings: () => Promise<void>;
    saveSetting: (name: keyof SettingsState, value: string) => Promise<void>;

    reset: () => void;
}

const initialState = {
    title: "Blog",
    color: "blue",
    theme: "auto" as ThemeType,
    favicon: "",
    isLoading: false
};

export const useSettingStore = create<SettingsState>()(
    persist(
        (set) => ({
            ...initialState,

            setTitle: (title) => set({ title }),

            setColor: (color) => {
                if (colorMap[color]) {
                    set({ color });
                }
            },

            setTheme: (theme) => set({ theme }),

            setFavicon: (favicon) => set({ favicon }),

            loadSettings: async () => {
                try {
                    set({ isLoading: true });

                    const settings = await getSettings();

                    set((state) => ({
                        title: settings.title ?? state.title,
                        favicon: settings.favicon,
                        color:
                            settings.color && colorMap[settings.color]
                                ? settings.color
                                : state.color,
                        theme: ["auto", "dark", "light"].includes(settings.theme)
                            ? settings.theme
                            : state.theme
                    }));
                } catch (error) {
                    throw new Error(extractErrorMessage(error))
                } finally {
                    set({ isLoading: false });
                }
            },

            saveSetting: async (name, value) => {
                try {
                    await updateSettings(name, value);

                    set((state) => ({
                        ...state,
                        [name]: value
                    }));
                } catch (error: unknown) {
                    throw new Error(extractErrorMessage(error))
                }
            },

            reset: () => set(initialState)
        }),
        {
            name: "settings-storage",

            partialize: (state) => ({
                theme: state.theme,
                color: state.color
            })
        }
    )
);