import { certificationPrivateRoutes, directoryPrivateRoutes, downloadsPrivateRoutes, homePrivateRoutes, juristicPrivateRoutes, settingsPrivateRoutes, standardsPrivateRoutes, systemsPrivateRoutes, uvehPrivateRoutes, vacationPrivateRoutes } from "@/features";
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
        standardsPrivateRoutes,
        juristicPrivateRoutes,
        certificationPrivateRoutes,
        vacationPrivateRoutes,
        directoryPrivateRoutes
    ]
}