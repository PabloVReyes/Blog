import { type RouteObject } from "react-router-dom";
import { Systems } from "../pages";

export const systemsRoutes: RouteObject = {
    path: "sistemas-de-consulta",
    children: [
        {
            index: true,
            element: <Systems/>
        },
    ]
}

