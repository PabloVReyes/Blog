import { settingsPrivateRoutes, systemsPrivateRoutes } from "@/features";
import { macroprocessPrivateRoutes } from "@/features/Macroprocess";
import type { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject = {
    path: "administracion",
    children: [
        {
            index: true,
            element: <>Inicio</>
        },
        systemsPrivateRoutes,
        macroprocessPrivateRoutes,
        settingsPrivateRoutes,
    ]
}