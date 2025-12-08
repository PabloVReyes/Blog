import { Home, Pages } from "@/features/private/pages";
import { type RouteObject } from "react-router-dom";

export const pagesRoutes: RouteObject = {
    path: "pages",
    children: [
        {
            index: true,
            element: <Pages />
        },
        {
            path: "home",
            element: <Home />
        }
    ]
}