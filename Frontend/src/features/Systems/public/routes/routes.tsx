import type { RouteObject } from "react-router-dom";
import { AgreementPerson, CareProtocols, CBIM, CIE10, ClinicalPracticeGuidelines, GPC, MonthlyReports, PBM, Systems } from "../pages";

export const systemsPublicRoutes: RouteObject = {
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
        },
        {
            path: "pbm",
            element: <PBM />
        },
        {
            path: "gpc",
            element: <GPC />
        },
        {
            path: "protocolos-atencion",
            element: <CareProtocols />
        }
    ]
}