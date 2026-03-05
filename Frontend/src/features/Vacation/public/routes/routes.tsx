import type { RouteObject } from "react-router-dom";
import { Vacation } from "../pages";

export const vacationPublicRoutes: RouteObject = {
    path: "rol-vacacional",
    children: [
        {
            index: true,
            element: <Vacation />
        }
    ]
}