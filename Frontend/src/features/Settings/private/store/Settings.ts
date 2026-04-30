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
    lastUpdated: number;

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

const channel = new BroadcastChannel("settings-sync");

const initialState = {
    title: "Blog",
    subtitle: "Beta",
    color: "blue",
    theme: "auto" as ThemeType,
    favicon: "",
    footer: "",
    isLoading: false,
    hasHydrated: false,
    lastUpdated: 0
};

export const useSettingStore = create<SettingsState>()(
    persist(
        (set) => ({
            ...initialState,

            setHasHydrated: (state) => set({ hasHydrated: state }),
            setTitle: (title) => set({ title }),

            setSubtitle: (subtitle) => set({ subtitle }),

            setColor: (color) => {
                if (colorMap[color]) {
                    const now = Date.now();
                    set({ color, lastUpdated: now });
                    channel.postMessage({ color, lastUpdated: now });
                }
            },

            setTheme: (theme) => {
                if (["auto", "dark", "light"].includes(theme)) {
                    const now = Date.now();
                    set({ theme, lastUpdated: now });
                    channel.postMessage({ theme, lastUpdated: now });
                }
            },

            setFavicon: (favicon) => {
                const now = Date.now();
                set({ favicon: favicon ?? "", lastUpdated: now });
                channel.postMessage({ favicon, lastUpdated: now });
            },

            setFooter: (footer) => {
                const now = Date.now();
                set({ footer: footer ?? "", lastUpdated: now });
                channel.postMessage({ footer, lastUpdated: now });
            },

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

                        theme:
                            state.theme !== "auto"
                                ? state.theme
                                : ["auto", "dark", "light"].includes(settings.theme)
                                    ? settings.theme
                                    : state.theme
                    }));
                } finally {
                    set({ isLoading: false });
                }
            },

            saveSetting: async (name, value) => {
                try {
                    const now = Date.now();

                    await updateSettings(name, value);

                    if (name === "color" && !colorMap[value]) return;
                    if (name === "theme" && !["auto", "dark", "light"].includes(value))
                        return;

                    set((state) => ({
                        ...state,
                        [name]: value,
                        lastUpdated: now
                    }));

                    channel.postMessage({
                        [name]: value,
                        lastUpdated: now
                    });
                } catch (error: unknown) {
                    throw new Error(extractErrorMessage(error));
                }
            },

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
                footer: state.footer,
                lastUpdated: state.lastUpdated
            }),

            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            }
        }
    )
);

channel.onmessage = (event) => {
    const incoming = event.data;
    const current = useSettingStore.getState();

    if (!incoming.lastUpdated) return;

    // ✅ SOLO actualiza si el dato es más nuevo
    if (incoming.lastUpdated > current.lastUpdated) {
        useSettingStore.setState({
            ...current,
            ...incoming
        });
    }
};