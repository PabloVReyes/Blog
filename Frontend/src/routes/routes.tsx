import type { RouteObject } from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { Layout } from "@/layout";
import { privateRoutes } from "./private.routes";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            publicRoutes,
            privateRoutes
        ]
    },
]