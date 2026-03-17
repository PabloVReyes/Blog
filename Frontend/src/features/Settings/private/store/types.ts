//////////////
// SETTINGS //
//////////////

export type ThemeType = "auto" | "dark" | "light";

export interface SettingState {
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