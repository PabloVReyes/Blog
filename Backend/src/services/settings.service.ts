import { getSettingsQuery, updateSettingsQuery } from "@/helpers/settings.query"
import path from "path";
import fs from "fs";

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

export const uploadFaviconService = (file: any) => {
    const ext = path.extname(file.originalname)
    const finalName = `favicon${ext}`;
    const finalPath = path.join(__dirname, "../../uploads", finalName)

    fs.renameSync(file.path, finalPath)

    const publicUrl = `/uploads/${finalName}`;

    return publicUrl
}