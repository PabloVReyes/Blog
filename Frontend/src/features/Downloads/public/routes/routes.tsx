import type { RouteObject } from "react-router-dom";
import { Area, Downloads } from "../pages";

export const downloadsPublicRoutes: RouteObject = {
    path: "descargas",
    children: [
        {
            index: true,
            element: <Downloads />
        },
        {
            path: ":slug",
            element: <Area />
        },
    ]
}