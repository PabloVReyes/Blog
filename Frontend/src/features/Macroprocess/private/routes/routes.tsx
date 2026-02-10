import type { RouteObject } from "react-router-dom";
import { Areas, Macroprocess, ManualsTypes } from "../pages";

export const macroprocessPrivateRoutes: RouteObject = {
    path: "macroproceso",
    children: [
        {
            index: true,
            element: <Macroprocess />,

        },
        {
            path: "tipos-manuales",
            element: <ManualsTypes />
        },
        {
            path: "areas",
            element: <Areas/>
        }
    ]
}