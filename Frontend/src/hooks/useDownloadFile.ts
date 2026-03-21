import { Notify } from "@/ui";
import { downloadFileUtil } from "@/utils";

export const useDownloadFile = () => {
    const download = async (fileId: string) => {
        try {
            await downloadFileUtil(fileId);
        } catch (error) {
            Notify({
                type: "error",
                title: "Error al descargar",
                message: "No se pudo descargar el archivo"
            });
        }
    };

    return { download };
};