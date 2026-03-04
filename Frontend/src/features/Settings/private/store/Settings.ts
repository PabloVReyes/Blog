import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSettings, updateSettings } from "@/api/settings";
import { colorMap } from "@/utils";
import type { TreeItems } from "@/features/sidebar/components/SortableTree/types";

type ThemeType = "auto" | "dark" | "light";

interface MenuItem {
    id: string;
    label: string;
    link: string;
    icon: string;
    children?: TreeItems;
}

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

    // Menus
    menu: TreeItems;
    setMenu: (menu: TreeItems) => void;
    addMenuItem: (item: MenuItem) => void;
    getMenuItemById: (id: string) => MenuItem | null;
    updateMenuItem: (
        id: string,
        updates: Partial<{ label: string; link: string; icon: string }>
    ) => void;
}

export const useSettingStore = create<SettingState>()(
    persist(
        (set, get) => ({
            settings: {},
            title: "Blog",
            color: "blue",
            theme: "auto",
            favicon: undefined,
            menu: [],

            // ===============================
            // Settings desde backend
            // ===============================
            setSettings: (settings) => {
                const themeFromDB: ThemeType = ["auto", "dark", "light"].includes(settings.theme)
                    ? (settings.theme as ThemeType)
                    : "auto";

                const colorFromDB =
                    settings.color && colorMap[settings.color]
                        ? settings.color
                        : "blue";

                let menu: TreeItems = [];
                try {
                    menu = settings.menu ? JSON.parse(settings.menu) : [];
                    if (!Array.isArray(menu)) menu = [];
                } catch (error) {
                    console.error("Error parseando el menú:", error);
                    menu = [];
                }

                set({
                    settings,
                    title: settings.title,
                    favicon: settings.favicon,
                    color: colorFromDB,

                    // ✅ Prioridad al theme local
                    theme: get().theme || themeFromDB,

                    menu
                });
            },

            setTitle: (title) => set({ title }),

            setColor: (color) => {
                if (colorMap[color]) {
                    set({ color });
                }
            },

            setTheme: (theme) => set({ theme }),

            setFavicon: (url) => set({ favicon: url }),

            // ===============================
            // API
            // ===============================
            loadSettings: async () => {
                try {
                    const settingsFromAPI = await getSettings();
                    get().setSettings(settingsFromAPI);
                } catch (error) {
                    console.error("Error cargando configuraciones:", error);
                }
            },

            saveSetting: async (name: string, value: string) => {
                try {
                    await updateSettings(name, value);
                    const newSettings = { ...get().settings, [name]: value };
                    get().setSettings(newSettings);
                } catch (error) {
                    console.error("Error guardando configuración:", error);
                }
            },

            // ===============================
            // Menú
            // ===============================
            setMenu: (menu) => set({ menu }),

            addMenuItem: (item) => {
                const currentMenu = get().menu || [];
                set({
                    menu: [...currentMenu, { ...item, children: item.children || [] }]
                });
            },

            getMenuItemById: (id) => {
                const findNode = (items: TreeItems): any | null => {
                    for (const item of items) {
                        if (item.id === id) return item;

                        if (item.children?.length) {
                            const found = findNode(item.children);
                            if (found) return found
                        }
                    }

                    return null;
                };
                return findNode(get().menu);
            },

            updateMenuItem: (id, updates) => {
                const updateNode = (items: TreeItems): TreeItems =>
                    items.map((item) => {
                        if (item.id === id) {
                            return { ...item, ...updates };
                        }

                        if (item.children && item.children.length > 0) {
                            return { ...item, children: updateNode(item.children) };
                        }

                        return item;
                    });

                set({ menu: updateNode(get().menu) });
            }
        }),
        {
            name: "settings-storage",

            // ✅ Persistir SOLO theme
            partialize: (state) => ({
                theme: state.theme,
                color: state.color
            }),

            // ✅ El valor local siempre gana
            merge: (persisted: any, current) => ({
                ...current,
                ...persisted
            })
        }
    )
);
