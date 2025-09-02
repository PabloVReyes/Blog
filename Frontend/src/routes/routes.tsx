import { Home } from "@/features/public/home/page";
import type { RouteObject } from "react-router-dom";
import { privateRoutes } from "./private/routes";

export const routes: RouteObject[] = [
    privateRoutes,
    {
        path: '/',
        element: <Home/>
    }
]