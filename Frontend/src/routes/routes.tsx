import type { RouteObject } from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { Layout } from "@/layout";
import { privateRoutes } from "./private.routes";
import { PrivateRoute } from "./PrivateRoute";
import { NotFound } from "@/features";

export const routes: RouteObject[] = [
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            publicRoutes,
            {
                element: <PrivateRoute />,
                children: [privateRoutes]
            },
        ]
    },
]