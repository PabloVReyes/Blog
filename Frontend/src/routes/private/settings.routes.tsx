import { General } from "@/features/private/settings/pages/General";
import { type RouteObject } from "react-router-dom";

export const settingsRoutes: RouteObject = {
    path: "settings",
    element: <General/>
}