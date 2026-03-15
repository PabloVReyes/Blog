import type { RouteObject } from "react-router-dom";
import { Standards } from "../pages";

export const standardsPrivateRoutes: RouteObject = {
    path: "normas-oficiales",
    children: [
        {
            index: true,
            element: <Standards />
        }
    ]
}