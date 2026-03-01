import type { RouteObject } from "react-router-dom";
import { Areas, Downloads } from "../pages";

export const downloadsPrivateRoutes: RouteObject = {
    path: "descargas",
    children: [
        {
            index: true,
            element: <Downloads />
        },
        {
            path: "areas",
            element: <Areas/>
        }
    ]
}