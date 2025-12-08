import { Sidebar } from "@/features/private/pages";
import { type RouteObject } from "react-router-dom";

export const sidebarRoutes: RouteObject = {
    path: "sidebar",
    element: <Sidebar/>
}