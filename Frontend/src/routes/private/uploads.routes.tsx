import { Uploads } from "@/features";
import { type RouteObject } from "react-router-dom";

export const uploadsRoutes: RouteObject = {
    path: "uploads",
    children: [
        {
            index: true,
            element: <Uploads />
        }
    ]
}