import { Layout } from "@/features/public/layout";
import { Home } from "@/features/public/pages";
import { DynamicPage } from "@/features/public/pages/DynamicPage";
import { type RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "/",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Home />
        },
        {
            path: ":slug",
            element: <DynamicPage />
        },
    ]
}

