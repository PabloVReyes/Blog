import { IconChartInfographic, IconDna2, IconFileText, IconPhone } from "@tabler/icons-react";
import type { CardsProps } from "./types";

export const cards: CardsProps[] = [
    {
        color: "green",
        icon: IconPhone,
        title: "Directorio SESVER",
        badge: "2025",
        description: "Directorio completo de personal SESVER"
    },
    {
        color: "blue",
        icon: IconDna2,
        title: "Comité Hospitalario de Bioética",
        description: "Información y procedimientos"
    },
    {
        color: "violet",
        icon: IconFileText,
        title: "Sistema de informes",
        description: "Acceso al módulo de reportes"
    },
    {
        color: "yellow",
        icon: IconChartInfographic,
        title: "Informes mensuales",
        description: "Estadísticas y métricas"
    }
]