import type { RouteObject } from "react-router-dom";
import { Certification } from "../pages";

export const certificationPublicRoutes: RouteObject = {
    path: "certificacion",
    children: [
        {
            index: true,
            element: <Certification />
        }
    ]
}