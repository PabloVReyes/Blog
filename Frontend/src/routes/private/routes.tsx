import { Layout } from "@/features/private/layout";
import { Navigate, type RouteObject } from "react-router-dom";
import { settingsRoutes } from "./settings.routes";
import { pagesRoutes } from "./pages.routes";
import { sidebarRoutes } from "./sidebar.routes";
import { Home } from "@/features/public/home/page";

export const privateRoutes: RouteObject = {
    path: "administration",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Navigate to="home" replace />
        },
        {
            path: "home",
            element: <Home/>
        },
        pagesRoutes,
        sidebarRoutes,
        settingsRoutes
    ]
}