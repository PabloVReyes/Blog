import type { RouteObject } from "react-router-dom";
import { General, Permissions, Roles, Settings, Users } from "../pages";

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
        },
        {
            path: "usuarios",
            element: <Users />
        },
        {
            path: "permisos",
            element: <Permissions />
        },
        {
            path: "roles",
            element: <Roles />
        }
    ]
}