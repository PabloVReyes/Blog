import { type RouteObject } from "react-router-dom";
import { CIE10, MonthlyReports, Systems } from "../pages";

export const systemsPrivateRoutes: RouteObject = {
    path: "sistemas-de-consulta",
    children: [
        {
            index: true,
            element: <Systems />
        },
        {
            path: "cie-10",
            element: <CIE10 />
        },
        {
            path: "informes-mensuales",
            element: <MonthlyReports />
        }
    ]
}

