import { downloadsPublicRoutes, homePublicRoutes, juristicRoutes, macroprocessPublicRoutes, standarsPublicRoutes, systemsPublicRoutes, uvehPublicRoutes, whoWeAreRoutes } from "@/features";
import { DynamicPage } from "@/features/public/pages/DynamicPage";
import { type RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "/",
    children: [
        systemsPublicRoutes,
        macroprocessPublicRoutes,
        homePublicRoutes,
        downloadsPublicRoutes,
        uvehPublicRoutes,
        standarsPublicRoutes,

        whoWeAreRoutes,
        juristicRoutes,
        {
            path: ":slug",
            element: <DynamicPage />
        },
    ]
}

