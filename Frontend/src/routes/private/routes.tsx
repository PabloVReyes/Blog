import { homePrivateRoutes, settingsPrivateRoutes, systemsPrivateRoutes } from "@/features";
import { downloadsPrivateRoutes } from "@/features/Downloads";
import { macroprocessPrivateRoutes } from "@/features/Macroprocess";
import type { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject = {
    path: "administracion",
    children: [
        homePrivateRoutes,
        systemsPrivateRoutes,
        macroprocessPrivateRoutes,
        settingsPrivateRoutes,
        downloadsPrivateRoutes
    ]
}