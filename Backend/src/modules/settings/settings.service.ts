import * as repo from "./settings.repository"
import path from "path";
import * as schema from "./settings.schema"
import { HttpError } from "@/utils/httpError";

export const settingsService = async () => {
    const settings = await repo.getSettingsRepository()

    return settings.reduce((acc: any, s: any) => {
        acc[s.name] = s.value;
        return acc;
    }, {} as Record<string, string>);
}

export const updateSettingsService = async (dto: schema.UpdateSettingsSchema) => {
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
        throw new HttpError(400, "No se envió ningún archivo")
    }
    const ext = path.extname(file.filename)
    const publicUrl = `/uploads/favicon${ext}`
    return {
        url: publicUrl
    }
}