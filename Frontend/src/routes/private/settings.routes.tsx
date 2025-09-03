import { General } from "@/features/private/settings/pages/General";
import { Navigate, type RouteObject } from "react-router-dom";

export const settingsRoutes: RouteObject = {
    path: "settings",
    children: [
        {
            path: "",
            element: <Navigate to="/administration/settings/general" replace/>
        },
        {
            path: "general",
            element: <General/>
        }
    ]
}