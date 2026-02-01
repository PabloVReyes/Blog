export const paths = [
    {
        label: "Inicio",
        icon: "IconHome",
        link: "/",
    },
    {
        label: "Sistemas de consulta",
        icon: "IconSearch",
        link: "/sistemas-de-consulta"
    },
    {
        label: "Páginas",
        icon: "IconAppWindow",
        link: "/administration/pages",
        children: [
            {
                label: "Inicio",
                link: "/administration/pages/home",
            }
        ]
    },
    {
        label: "Menú lateral",
        icon: "IconLayoutSidebar",
        link: "/administration/sidebar",
    },
    {
        label: "Archivos",
        icon: "IconFiles",
        link: "/administration/uploads"
    },
    {
        label: "Configuraciones",
        icon: "IconSettings",
        link: "/administration/settings",
    },
]