import { AllPages } from "@/features/private/pages/pages/AllPages";
import { Navigate, type RouteObject } from "react-router-dom";

export const pagesRoutes: RouteObject = {
    path: "pages",
    children: [
        {
            path: "",
            element: <Navigate to="/administration/pages/all" replace/>
        },
        {
            path: "all",
            element: <AllPages/>
        }
    ]
}