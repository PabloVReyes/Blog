import type { RouteObject } from "react-router-dom";
import { Juristic } from "../pages";

export const juristicPublicRoutes: RouteObject = {
    path: "disposiciones-juridicas-administrativas",
    children: [
        {
            index: true,
            element: <Juristic />
        }
    ]
}