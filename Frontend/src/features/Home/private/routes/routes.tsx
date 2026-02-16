import { Navigate, type RouteObject } from "react-router-dom";
import { Home } from "../pages";

export const homePrivateRoutes: RouteObject = {
    path: "",
    children: [
        {
            index: true,
            element: <Navigate to={"/administracion/inicio"} />
        },
        {
            path: "inicio",
            element: <Home/>
        }
    ]
}

