import type { RouteObject } from "react-router-dom";
import { Standars } from "../pages";

export const standarsPublicRoutes: RouteObject = {
    path: "normas-oficiales",
    children: [
        {
            index: true,
            element: <Standars />
        }
    ]
}