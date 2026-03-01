import {
    IconFileTypePdf,
    IconFileTypeDoc,
    IconFileTypeXls,
    IconFileTypePpt,
    IconFileTypeZip,
    IconFileText,
    IconPhoto,
    IconFileUnknown,
} from "@tabler/icons-react";

export const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 MB";
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
};

interface FileMeta {
    label: string;
    icon: React.ReactNode;
}

const getExtension = (fileName?: string) =>
    fileName?.split(".").pop()?.toLowerCase();

export const resolveFileMeta = (
    mimeType?: string,
    fileName?: string
): FileMeta => {
    const mime = mimeType?.toLowerCase() || "";
    const ext = getExtension(fileName);

    // ===== PDF =====
    if (mime.includes("pdf") || ext === "pdf")
        return { label: "PDF", icon: <IconFileTypePdf size={ 28 } />
};

// ===== WORD =====
if (
    mime.includes("msword") ||
    mime.includes("wordprocessingml") ||
    mime.includes("ms-word") ||
    ["doc", "docx", "dot", "dotx", "docm", "dotm"].includes(ext || "")
)
    return { label: "Word", icon: <IconFileTypeDoc size={ 28 } /> };

// ===== EXCEL =====
if (
    mime.includes("ms-excel") ||
    mime.includes("spreadsheetml") ||
    ["xls", "xlsx", "xlsm", "xlsb", "xlt", "xltx", "xltm"].includes(ext || "")
)
    return { label: "Excel", icon: <IconFileTypeXls size={ 28 } /> };

// ===== POWERPOINT =====
if (
    mime.includes("ms-powerpoint") ||
    mime.includes("presentationml") ||
    ["ppt", "pptx", "pptm", "pps", "ppsx", "pot", "potx"].includes(ext || "")
)
    return { label: "PowerPoint", icon: <IconFileTypePpt size={ 28 } /> };

// ===== ZIP / COMPRESIÓN =====
if (
    mime.includes("zip") ||
    mime.includes("rar") ||
    ["zip", "rar", "7z"].includes(ext || "")
)
    return { label: "Comprimido", icon: <IconFileTypeZip size={ 28 } /> };

// ===== IMAGEN =====
if (mime.startsWith("image/"))
    return { label: "Imagen", icon: <IconPhoto size={ 28 } /> };

// ===== TEXTO =====
if (mime.startsWith("text/") || ext === "txt")
    return { label: "Texto", icon: <IconFileText size={ 28 } /> };

return { label: "Archivo", icon: <IconFileUnknown size={ 28 } /> };
};