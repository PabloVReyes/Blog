import { api } from "@/lib";

export const downloadFile = (fileId: string) => {
    return api.get(`/api/files/download/${fileId}`, {
        responseType: "blob"
    });
};