import { downloadFile } from "@/api";

// utils/downloadFile.ts
export const downloadFileUtil = async (fileId: string) => {
    const response = await downloadFile(fileId);

    const disposition = response.headers["content-disposition"];

    const fileName =
        disposition?.split("filename=")[1]?.replace(/"/g, "") ||
        "archivo";

    const blob = new Blob([response.data], {
        type: response.headers["content-type"]
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
};