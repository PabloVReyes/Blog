import { Summary } from "@/features/private/home/pages/Summary";
import { Layout } from "@/features/private/layout";
import { Navigate, type RouteObject } from "react-router-dom";
import { settingsRoutes } from "./settings.routes";
import { pagesRoutes } from "./pages.routes";

export const privateRoutes: RouteObject = {
    path: "administration",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Navigate to="home/summary" replace />
        },
        {
            path: "home",
            children: [
                {
                    path: "summary",
                    element: <Summary />
                }
            ]
        },
        pagesRoutes,
        settingsRoutes
    ]
}