import { Page } from "@/features/private/settings/pages/Page";
import { Navigate, type RouteObject } from "react-router-dom";

export const settingsRoutes: RouteObject = {
    path: "settings",
    children: [
        {
            path: "",
            element: <Navigate to="/administration/settings/page" replace/>
        },
        {
            path: "page",
            element: <Page/>
        }
    ]
}