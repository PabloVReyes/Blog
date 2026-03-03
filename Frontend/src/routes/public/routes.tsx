import { downloadsPublicRoutes, homePublicRoutes, juristicPublicRoutes, macroprocessPublicRoutes, standarsPublicRoutes, systemsPublicRoutes, uvehPublicRoutes, whoWeAreRoutes } from "@/features";
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
        juristicPublicRoutes,

        whoWeAreRoutes,
    ]
}

