import type { RouteObject } from "react-router-dom";
import { privateRoutes } from "./private/routes";
import { publicRoutes } from "./public/routes";
import { Layout } from "@/layout";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            publicRoutes,
            privateRoutes
        ]
    },
    // homeRoutes,
    // privateRoutes,
    // publicRoutes,
]