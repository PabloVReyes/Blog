import type { RouteObject } from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { Layout } from "@/layout";
import { privateRoutes } from "./private.routes";
import { PrivateRoute } from "./PrivateRoute";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            publicRoutes,
            {
                element: <PrivateRoute/>,
                children: [privateRoutes]
            }
        ]
    },
]