import { Navigate, type RouteObject } from "react-router-dom";
import { CodesOfEthics, OrganizationalPhilosophy } from "../pages";

export const whoWeArePublicRoutes: RouteObject = {
    path: "quienes-somos",
    children: [
        {
            index: true,
            element: <Navigate to={'filosofia-organizacional'}/>
        },
        {
            path: "filosofia-organizacional",
            element: <OrganizationalPhilosophy/>
        },
        {
            path: "codigos-de-etica",
            element: <CodesOfEthics/>
        }
    ]
}

