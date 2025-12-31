import { Navigate, type RouteObject } from "react-router-dom";
import { settingsRoutes } from "./settings.routes";
import { pagesRoutes } from "./pages.routes";
import { sidebarRoutes } from "./sidebar.routes";
import { filesRoutes } from "./files.routes";
import { MainLayout } from "@/layouts";

export const privateRoutes: RouteObject = {
    path: "administration",
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: <Navigate to="home" replace />
        },
        {
            path: "home",
            element: <>Inicio</>
        },
        pagesRoutes,
        sidebarRoutes,
        settingsRoutes,
        filesRoutes
    ]
}