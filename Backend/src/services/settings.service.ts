import { getSettingsQuery, updateSettingsQuery } from "@/helpers/settings.query"

export const settingsService = async () => {
    const settings: any = await getSettingsQuery()

    return settings.reduce((acc, s) => {
        acc[s.name] = s.value;
        return acc;
    }, {} as Record<string, string>);
}

interface Props {
    name: string
    value: string
}

export const updateSettingsService = async ({ name, value }: Props) => {
    await updateSettingsQuery({ name, value })
    return true;
}