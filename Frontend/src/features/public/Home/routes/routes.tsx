import { type RouteObject } from "react-router-dom";
import { Home } from "../pages";

export const homeRoutes: RouteObject = {
    index: true,
    element: (
        <Home/>
    )
}

