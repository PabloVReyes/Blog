import { downloadsRoutes, homeRoutes, juristicRoutes, standardsRoutes, systemsPublicRoutes, whoWeAreRoutes } from "@/features";
import { DynamicPage } from "@/features/public/pages/DynamicPage";
import { type RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "/",
    children: [
        homeRoutes,
        whoWeAreRoutes,
        systemsPublicRoutes,
        standardsRoutes,
        juristicRoutes,
        downloadsRoutes,
        {
            path: ":slug",
            element: <DynamicPage />
        },
    ]
}

