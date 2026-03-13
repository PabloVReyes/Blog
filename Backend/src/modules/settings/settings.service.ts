import * as repo from "./settings.repository"
import path from "path";
import * as scheme from "./settings.scheme"

export const settingsService = async () => {
    const settings = await repo.getSettingsRepository()

    return settings.reduce((acc, s) => {
        acc[s.name] = s.value;
        return acc;
    }, {} as Record<string, string>);
}

export const updateSettingsService = async (dto: scheme.UpdateSettingsScheme) => {
    const { name, value } = dto
    await repo.updateSettingsRepository({
        name,
        value
    })
    return true;
}

export const uploadFaviconService = async (
    file?: Express.Multer.File
) => {
    if (!file) {
        throw new Error("No se envió ningún archivo")
    }
    const ext = path.extname(file.filename)
    const publicUrl = `/uploads/favicon${ext}`
    return {
        url: publicUrl
    }
}