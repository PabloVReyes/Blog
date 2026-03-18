import { createCrudApi } from "@/lib";
import type { Directory, DirectoryFilters } from "../types/directory.types";

export const directoryApi = createCrudApi<
    Directory,
    Partial<Directory>,
    Partial<Directory>,
    DirectoryFilters
>("/api/directory")

// 30 lineas -> 9 lineas