import { getSettingsQuery } from "@/helpers/settings.query"

export const settingsService = async () => {
    const settings: any = await getSettingsQuery()

    return settings.reduce((acc, s) => {
        acc[s.name] = s.value;
        return acc;
    }, {} as Record<string, string>);
}