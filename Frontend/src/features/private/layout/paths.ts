import { IconHome, IconSettings } from "@tabler/icons-react";

export const paths = [
    {
        label: "Inicio",
        icon: IconHome,
        link: "administration/home",
        links: [
            {
                label: "Resumen",
                link: "/administration/home/summary"
            }
        ]
    },
    {
        label: "Configuraciones",
        icon: IconSettings,
        link: "administration/settings",
        links: [
            {
                label: "Pagina",
                link: "/administration/settings/page"
            }
        ]
    }
]