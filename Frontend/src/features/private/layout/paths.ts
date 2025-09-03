import { IconAppWindow, IconHome, IconSettings } from "@tabler/icons-react";

export const paths = [
    {
        label: "Inicio",
        icon: IconHome,
        link: "/administration/home",
        links: [
            {
                label: "Resumen",
                link: "/administration/home/summary"
            }
        ]
    },
    {
        label: "Páginas",
        icon: IconAppWindow,
        link: "/administration/pages",
        links: [
            {
                label: "Todas las páginas",
                link: "/administration/pages/all"
            }
        ]
    },
    {
        label: "Configuraciones",
        icon: IconSettings,
        link: "/administration/settings",
        links: [
            {
                label: "General",
                link: "/administration/settings/general"
            }
        ]
    }
]