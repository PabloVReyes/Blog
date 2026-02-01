
import { type RouteObject } from "react-router-dom";
import { Directorate, Downloads } from "../pages";

export const downloadsRoutes: RouteObject = {
    path: "descargas",
    children: [
        {
            index: true,
            element: <Downloads />
        },
        {
            path: "direccion",
            element: <Directorate />
        }
    ]
}

