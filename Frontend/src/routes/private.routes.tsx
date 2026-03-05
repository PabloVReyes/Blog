import { certificationPrivateRoutes, downloadsPrivateRoutes, homePrivateRoutes, juristicPrivateRoutes, settingsPrivateRoutes, standarsPrivateRoutes, systemsPrivateRoutes, uvehPrivateRoutes, vacationPrivateRoutes } from "@/features";
import { macroprocessPrivateRoutes } from "@/features/Macroprocess";
import type { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject = {
    path: "administracion",
    children: [
        homePrivateRoutes,
        systemsPrivateRoutes,
        macroprocessPrivateRoutes,
        settingsPrivateRoutes,
        downloadsPrivateRoutes,
        uvehPrivateRoutes,
        standarsPrivateRoutes,
        juristicPrivateRoutes,
        certificationPrivateRoutes,
        vacationPrivateRoutes
    ]
}