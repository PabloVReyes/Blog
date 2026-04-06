import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { colorMap } from "@/utils";
import { getSettings, updateSettings } from "../api";
import type { ThemeType } from "./types";
import { extractErrorMessage } from "@/lib";

type WritableSettingsKeys =
    | "title"
    | "subtitle"
    | "color"
    | "theme"
    | "favicon"
    | "footer";

interface SettingsState {
    title: string;
    subtitle: string;
    color: string;
    theme: ThemeType;
    favicon: string;
    footer: string;

    isLoading: boolean;

    hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;

    setTitle: (title: string) => void;
    setSubtitle: (subtitle: string) => void;
    setColor: (color: string) => void;
    setTheme: (theme: ThemeType) => void;
    setFavicon: (url?: string) => void;
    setFooter: (footer?: string) => void;

    loadSettings: () => Promise<void>;
    saveSetting: (name: WritableSettingsKeys, value: string) => Promise<void>;

    reset: () => void;
}

const initialState = {
    title: "Blog",
    subtitle: "Beta",
    color: "blue",
    theme: "auto" as ThemeType,
    favicon: "",
    footer: "",
    isLoading: false,
    hasHydrated: false
};

export const useSettingStore = create<SettingsState>()(
    persist(
        (set) => ({
            ...initialState,

            setHasHydrated: (state) => set({ hasHydrated: state }),

            // =========================
            // SETTERS
            // =========================
            setTitle: (title) => set({ title }),

            setSubtitle: (subtitle) => set({ subtitle }),

            setColor: (color) => {
                if (colorMap[color]) set({ color });
            },

            setTheme: (theme) => {
                if (["auto", "dark", "light"].includes(theme)) {
                    set({ theme });
                }
            },

            setFavicon: (favicon) => set({ favicon: favicon ?? "" }),

            setFooter: (footer) => set({ footer: footer ?? "" }),

            // =========================
            // LOAD API
            // =========================
            loadSettings: async () => {
                try {
                    set({ isLoading: true });

                    const settings = await getSettings();

                    set((state) => ({
                        title: settings.title ?? state.title,
                        subtitle: settings.subtitle ?? state.subtitle,
                        favicon: settings.favicon ?? state.favicon,
                        footer: settings.footer ?? state.footer,

                        color:
                            settings.color && colorMap[settings.color]
                                ? settings.color
                                : state.color,

                        // 🔥 FIX REAL AQUÍ
                        theme:
                            state.theme !== "auto" // ← si el usuario ya eligió algo
                                ? state.theme
                                : ["auto", "dark", "light"].includes(settings.theme)
                                    ? settings.theme
                                    : state.theme
                    }));
                } finally {
                    set({ isLoading: false });
                }
            },

            // =========================
            // SAVE
            // =========================
            saveSetting: async (name, value) => {
                try {
                    await updateSettings(name, value);

                    if (name === "color" && !colorMap[value]) return;
                    if (name === "theme" && !["auto", "dark", "light"].includes(value))
                        return;

                    set((state) => ({
                        ...state,
                        [name]: value
                    }));
                } catch (error: unknown) {
                    throw new Error(extractErrorMessage(error));
                }
            },

            // =========================
            // RESET
            // =========================
            reset: () => set(initialState)
        }),
        {
            name: "settings-storage",
            storage: createJSONStorage(() => localStorage),

            partialize: (state) => ({
                theme: state.theme,
                color: state.color,
                title: state.title,
                subtitle: state.subtitle,
                favicon: state.favicon,
                footer: state.footer
            }),

            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            }
        }
    )
);