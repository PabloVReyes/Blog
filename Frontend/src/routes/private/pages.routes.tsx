import { Pages } from "@/features/private/pages/pages/Pages";
import { type RouteObject } from "react-router-dom";

export const pagesRoutes: RouteObject = {
    path: "pages",
    element: <Pages />
}