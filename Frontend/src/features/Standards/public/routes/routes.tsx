import type { RouteObject } from "react-router-dom";
import { Standards } from "../pages";

export const standardsPublicRoutes: RouteObject = {
    path: "normas-oficiales",
    children: [
        {
            index: true,
            element: <Standards />
        }
    ]
}