import type { RouteObject } from "react-router-dom";
import { General, Settings } from "../pages";

export const settingsPrivateRoutes: RouteObject = {
    path: "configuraciones",
    children: [
        {
            index: true,
            element: <Settings />
        },
        {
            path: "general",
            element: <General />
        }
    ]
}