import { Navigate, type RouteObject } from "react-router-dom";
import { settingsRoutes } from "./settings.routes";
import { pagesRoutes } from "./pages.routes";
import { sidebarRoutes } from "./sidebar.routes";
import { uploadsRoutes } from "./uploads.routes";

export const privateRoutes: RouteObject = {
    path: "administration",
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
        uploadsRoutes
    ]
}