import { privateRoutes, publicRoutes } from "@/routes";
import type { RouteObject } from "react-router-dom";

export const router: RouteObject[] = [
    privateRoutes,
    publicRoutes,
    {
        path: '/',
        element: <>Hola</>
    }
]