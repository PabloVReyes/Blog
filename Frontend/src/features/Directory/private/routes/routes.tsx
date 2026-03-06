import type { RouteObject } from "react-router-dom";
import { Directory } from "../pages";

export const directoryPrivateRoutes: RouteObject = {
    path: "directorio",
    children: [
        {
            index: true,
            element: <Directory />
        },
    ]
}