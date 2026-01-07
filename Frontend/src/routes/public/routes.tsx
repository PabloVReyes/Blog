import { Home } from "@/features/public/pages";
import { DynamicPage } from "@/features/public/pages/DynamicPage";
import { MainLayout } from "@/shared";
import { type RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "/",
    element: <MainLayout />,
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

