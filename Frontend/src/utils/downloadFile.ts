import { downloadFile } from "@/api";

// utils/downloadFile.ts
export const downloadFileUtil = async (
    fileId: string,
    mode: "download" | "view" = "download"
) => {
    const response = await downloadFile(fileId);

    const disposition = response.headers["content-disposition"];

    const fileName =
        disposition?.split("filename=")[1]?.replace(/"/g, "") ||
        "archivo";

    const blob = new Blob([response.data], {
        type: response.headers["content-type"]
    });

    const url = window.URL.createObjectURL(blob);

    if (mode === "view") {
        window.open(url, "_blank");

        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 5000);

        return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
};