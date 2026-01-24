import { homeRoutes, systemsRoutes, whoWeAreRoutes } from "@/features";
import { DynamicPage } from "@/features/public/pages/DynamicPage";
import { MainLayout } from "@/shared";
import { type RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "/",
    element: <MainLayout />,
    children: [
        homeRoutes,
        whoWeAreRoutes,
        systemsRoutes,
        {
            path: ":slug",
            element: <DynamicPage />
        },
    ]
}

