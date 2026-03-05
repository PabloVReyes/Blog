import type { RouteObject } from "react-router-dom";
import { Shift, Vacation } from "../pages";

export const vacationPrivateRoutes: RouteObject = {
    path: "rol-vacacional",
    children: [
        {
            index: true,
            element: <Vacation />
        },
        {
            path: "turnos",
            element: <Shift />
        }
    ]
}