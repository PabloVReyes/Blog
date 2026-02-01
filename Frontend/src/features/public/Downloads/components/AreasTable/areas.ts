import { IconActivity, IconBook, IconBulb, IconCircleCheck, IconClipboardList, IconDroplet, IconFileText, IconHammer, IconHeart, IconMessage, IconNurse, IconPillFilled, IconScale, IconSettings, IconShield, IconShoppingCart, IconSitemap, IconStethoscope, IconUser, IconUserCircle } from "@tabler/icons-react";
import type { AreasProps } from "./types";

export const areas: AreasProps[] = [
    {
        id: 1,
        name: "Dirección",
        icon: IconSitemap,
        color: "green.6"
    },
    {
        id: 2,
        name: "Subdirección Medica",
        icon: IconStethoscope,
        color: "blue.4"
    },
    {
        id: 3,
        name: "Consulta Externa",
        icon: IconClipboardList,
        color: "teal.6"
    },
    {
        id: 4,
        name: "Comunicación Social",
        icon: IconMessage,
        color: "blue.5"
    },
    {
        id: 5,
        name: "Presentaciones Comités",
        icon: IconUser,
        color: "teal.7"
    },
    {
        id: 6,
        name: "Abastecimientos",
        icon: IconShoppingCart,
        color: "yellow.5"
    },
    {
        id: 7,
        name: "Seguridad e Higiene",
        icon: IconShield,
        color: "blue.3"
    },
    {
        id: 8,
        name: "Recursos Humanos",
        icon: IconUserCircle,
        color: "green.8"
    },
    {
        id: 9,
        name: "Servicios Médicos",
        icon: IconActivity,
        color: "teal.7"
    },
    {
        id: 10,
        name: "Calidad",
        icon: IconCircleCheck,
        color: "blue.8"
    },
    {
        id: 11,
        name: "Archivo Clínico",
        icon: IconFileText,
        color: "orange.6"
    },
    {
        id: 12,
        name: "UVEH",
        icon: IconHeart,
        color: "green.6"
    },
    {
        id: 13,
        name: "Jurídico",
        icon: IconScale,
        color: "yellow.9"
    },
    {
        id: 14,
        name: "Servicios Generales",
        icon: IconSettings,
        color: "dark.8"
    },
    {
        id: 15,
        name: "Planeación",
        icon: IconBulb,
        color: "yellow.5"
    },
    {
        id: 16,
        name: "Recursos Físicos (Mantenimiento)",
        icon: IconHammer,
        color: "teal.6"
    },
    {
        id: 17,
        name: "Servicios Farmacéuticos",
        icon: IconPillFilled,
        color: "blue.4"
    },
    {
        id: 18,
        name: "Calidad en Enfermería",
        icon: IconNurse,
        color: "blue.3"
    },
    {
        id: 19,
        name: "Banco de Sangre",
        icon: IconDroplet,
        color: "red.7"
    },
    {
        id: 20,
        name: "Comité Hospitalario Bioética",
        icon: IconBook,
        color: "gray.6"
    }
]