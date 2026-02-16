import { downloadsRoutes, homePublicRoutes, juristicRoutes, macroprocessPublicRoutes, standardsRoutes, systemsPublicRoutes, whoWeAreRoutes } from "@/features";
import { DynamicPage } from "@/features/public/pages/DynamicPage";
import { type RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "/",
    children: [
        systemsPublicRoutes,
        macroprocessPublicRoutes,
        homePublicRoutes,

        whoWeAreRoutes,
        standardsRoutes,
        juristicRoutes,
        downloadsRoutes,
        {
            path: ":slug",
            element: <DynamicPage />
        },
    ]
}

