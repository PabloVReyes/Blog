import { Files } from "@/features/private/pages";
import { type RouteObject } from "react-router-dom";

export const filesRoutes: RouteObject = {
    path: "files",
    children: [
        {
            index: true,
            element: <Files />
        }
    ]
}