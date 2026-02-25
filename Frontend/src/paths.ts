export const paths = [
    {
        label: "Inicio",
        icon: "IconHome",
        link: "/inicio",
    },
    {
        label: "Sistemas de consulta",
        icon: "IconSearch",
        link: "/sistemas-de-consulta",
        children: [
            {
                label: "CIE-10",
                link: "/cie-10"
            },
            {
                label: "Informes Mensuales",
                link: "/informes-mensuales"
            },
            {
                label: "Pacientes de Convenio",
                link: "/pacientes-convenio"
            },
            {
                label: "CBIM - CAE",
                link: "/cbim"
            },
            {
                label: "GPC Cenetec",
                link: "/guias-practica-clinica"
            },
            {
                label: "Algoritmos PBM",
                link: "/pbm"
            },
            {
                label: "Algoritmos GPC",
                link: "gpc"
            }
        ]
    },
    {
        id: "macroproceso",
        label: "Macroproceso",
        icon: "IconGitBranch",
        link: "/macroproceso",
        children: [
            {
                label: "Manuales",
                link: "/tipos-manuales"
            },
            {
                label: "Áreas",
                link: "/areas"
            }
        ]
    },
    // {
    //     label: "Páginas",
    //     icon: "IconAppWindow",
    //     link: "/administration/pages",
    //     children: [
    //         {
    //             label: "Inicio",
    //             link: "/administration/pages/home",
    //         }
    //     ]
    // },
    // {
    //     label: "Menú lateral",
    //     icon: "IconLayoutSidebar",
    //     link: "/administration/sidebar",
    // },
    // {
    //     label: "Archivos",
    //     icon: "IconFiles",
    //     link: "/administration/uploads"
    // },
    {
        label: "Configuraciones",
        icon: "IconSettings",
        link: "/configuraciones",
    },
]