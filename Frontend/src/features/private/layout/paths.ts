import { IconAppWindow, IconHome, IconLayoutSidebar, IconSettings } from "@tabler/icons-react";

export const paths = [
    {
        label: "Inicio",
        icon: IconHome,
        link: "/administration/home",
    },
    {
        label: "Páginas",
        icon: IconAppWindow,
        link: "/administration/pages",
        links: [
            {
                label: "Inicio",
                link: "/administration/pages/home",
            }
        ]
    },
    {
        label: "Menú lateral",
        icon: IconLayoutSidebar,
        link: "/administration/sidebar",
    },
    {
        label: "Configuraciones",
        icon: IconSettings,
        link: "/administration/settings",
    }
]