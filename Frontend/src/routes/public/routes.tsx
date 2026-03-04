import { certificationPublicRoutes, downloadsPublicRoutes, homePublicRoutes, juristicPublicRoutes, macroprocessPublicRoutes, standarsPublicRoutes, systemsPublicRoutes, uvehPublicRoutes, whoWeArePublicRoutes } from "@/features";
import { type RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "/",
    children: [
        whoWeArePublicRoutes,
        systemsPublicRoutes,
        uvehPublicRoutes,
        standarsPublicRoutes,
        juristicPublicRoutes,
        macroprocessPublicRoutes,
        certificationPublicRoutes,
        homePublicRoutes,
        downloadsPublicRoutes,
    ]
}

