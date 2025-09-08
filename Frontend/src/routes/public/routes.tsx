import { Layout } from "@/features/public/layout";
import { DynamicPage } from "@/features/public/pages/pages/DynamicPage";
import { type RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "/",
    element: <Layout />,
    children: [
        {
            path: ":slug",
            element: <DynamicPage/>
        },
    ]
}