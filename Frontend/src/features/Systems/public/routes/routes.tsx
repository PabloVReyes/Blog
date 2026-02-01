import type { RouteObject } from "react-router-dom";
import { Systems } from "../pages";

export const systemsPublicRoutes: RouteObject = {
    path: "sistemas-de-consulta",
    children: [
        {
            index: true,
            element: <Systems />
        }
    ]
}