import type { RouteObject } from "react-router-dom";
import { Certification } from "../pages";

export const certificationPrivateRoutes: RouteObject = {
    path: "certificacion",
    children: [
        {
            index: true,
            element: <Certification />
        }
    ]
}