import { Sidebar } from "@/features/private/sidebar/pages/Sidebar";
import { type RouteObject } from "react-router-dom";

export const sidebarRoutes: RouteObject = {
    path: "sidebar",
    element: <Sidebar/>
}