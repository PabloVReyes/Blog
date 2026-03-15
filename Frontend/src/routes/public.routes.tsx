import { certificationPublicRoutes, downloadsPublicRoutes, homePublicRoutes, juristicPublicRoutes, macroprocessPublicRoutes, standardsPublicRoutes, systemsPublicRoutes, uvehPublicRoutes, vacationPublicRoutes, whoWeArePublicRoutes } from "@/features";
import { type RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "/",
    children: [
        whoWeArePublicRoutes,
        systemsPublicRoutes,
        uvehPublicRoutes,
        standardsPublicRoutes,
        juristicPublicRoutes,
        macroprocessPublicRoutes,
        certificationPublicRoutes,
        homePublicRoutes,
        downloadsPublicRoutes,
        vacationPublicRoutes
    ]
}

