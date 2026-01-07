import { Sidebar } from "@/features";
import { type RouteObject } from "react-router-dom";

export const sidebarRoutes: RouteObject = {
    path: "sidebar",
    element: <Sidebar />
}