import { type RouteObject } from "react-router-dom";
import { AgreementPerson, CBIM, CIE10, ClinicalPracticeGuidelines, MonthlyReports, Systems } from "../pages";

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
        },
        {
            path: "pacientes-convenio",
            element: <AgreementPerson />
        },
        {
            path: "cbim",
            element: <CBIM />
        },
        {
            path: "guias-practica-clinica",
            element: <ClinicalPracticeGuidelines />
        }
    ]
}

