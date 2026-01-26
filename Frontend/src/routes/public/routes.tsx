import { homeRoutes, standardsRoutes, systemsRoutes, whoWeAreRoutes } from "@/features";
import { DynamicPage } from "@/features/public/pages/DynamicPage";
import { type RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "/",
    children: [
        homeRoutes,
        whoWeAreRoutes,
        systemsRoutes,
        standardsRoutes,
        {
            path: ":slug",
            element: <DynamicPage />
        },
    ]
}

