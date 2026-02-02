import type { RouteObject } from "react-router-dom";
import { Settings } from "../pages";

export const settingsPrivateRoutes: RouteObject = {
    path: "configuraciones",
    element: <Settings />
}