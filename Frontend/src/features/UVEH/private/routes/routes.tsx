import type { RouteObject } from "react-router-dom";
import { UVEH } from "../pages";

export const uvehPrivateRoutes: RouteObject = {
    path: "uveh",
    children: [
        {
            index: true,
            element: <UVEH />
        }
    ]
}