import { Navigate, type RouteObject } from "react-router-dom";
import { CodesOfEthics, OrganizationalPhilosophy } from "../pages";

export const whoWeArePublicRoutes: RouteObject = {
    path: "quienes-somos",
    children: [
        {
            index: true,
            element: <Navigate to={'filosofira-organizacional'}/>
        },
        {
            path: "filosofira-organizacional",
            element: <OrganizationalPhilosophy/>
        },
        {
            path: "codigos-de-etica",
            element: <CodesOfEthics/>
        }
    ]
}

