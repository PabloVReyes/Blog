import { downloadsPublicRoutes, homePublicRoutes, juristicRoutes, macroprocessPublicRoutes, standardsRoutes, systemsPublicRoutes, whoWeAreRoutes } from "@/features";
import { DynamicPage } from "@/features/public/pages/DynamicPage";
import { type RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "/",
    children: [
        systemsPublicRoutes,
        macroprocessPublicRoutes,
        homePublicRoutes,
        downloadsPublicRoutes,

        whoWeAreRoutes,
        standardsRoutes,
        juristicRoutes,
        {
            path: ":slug",
            element: <DynamicPage />
        },
    ]
}

