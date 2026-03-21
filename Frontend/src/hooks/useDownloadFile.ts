import { Notify } from "@/ui";
import { downloadFileUtil } from "@/utils";

export const useDownloadFile = () => {
    const download = async (fileId: string) => {
        try {
            await downloadFileUtil(fileId, "download");
        } catch (error) {
            Notify({
                type: "error",
                title: "Error al descargar",
                message: "No se pudo descargar el archivo"
            });
        }
    };

    const view = async (fileId: string) => {
        try {
            await downloadFileUtil(fileId, "view");
        } catch {
            Notify({
                type: "error",
                title: "Error al visualizar",
                message: "No se pudo abrir el archivo"
            });
        }
    };

    return { download, view };
};