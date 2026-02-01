import { systemsPrivateRoutes } from "@/features";
import type { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject = {
    path: "administracion",
    children: [
        {
            index: true,
            element: <>Inicio</>
        },
        systemsPrivateRoutes
    ]
}