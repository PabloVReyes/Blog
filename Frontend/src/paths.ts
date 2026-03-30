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
                link: "/gpc"
            },
            {
                label: "Protocolos de Atención (Pediatría)",
                link: "/protocolos-atencion"
            },
            {
                label: "Eventos Adversos",
                link: '/eventos-adversos'
            }
        ]
    },
    {
        id: "uveh",
        label: "Vigilancia Epidemiológica",
        icon: "IconVirus",
        link: "/uveh"
    },
    {
        id: "normas-oficiales",
        label: "Normas Oficiales",
        icon: "IconFileText",
        link: "/normas-oficiales"
    },
    {
        id: "disposiciones-juridicas-administrativas",
        label: "Disposiciones Jurídicas Administrativas",
        icon: "IconGavel",
        link: "/disposiciones-juridicas-administrativas"
    },
    {
        id: "certification",
        label: "Certificación",
        icon: "IconAward",
        link: "/certificacion"
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
    {
        id: "downloads",
        label: "Descargar Información",
        icon: "IconDownload",
        link: "/descargas",
        children: [
            {
                label: "Areas",
                link: "/areas"
            }
        ]
    },
    {
        id: "vacation",
        label: "Rol Vacacional",
        icon: "IconBeach",
        link: "/rol-vacacional",
        children: [
            {
                label: "Turnos",
                link: "/turnos"
            }
        ]
    },
    {
        id: "directory",
        label: "Directorio Telefónico",
        icon: "IconBook",
        link: "/directorio",
    },
    {
        label: "Configuraciones",
        icon: "IconSettings",
        link: "/configuraciones",
        children: [
            {
                label: "Usuarios",
                icon: "IconSettings",
                link: "/usuarios",
            },
            {
                label: "Roles",
                icon: "IconSettings",
                link: "/roles",
            },
            {
                label: "Permisos",
                icon: "IconSettings",
                link: "/permisos",
            },
            {
                label: "Generales",
                icon: "IconSettings",
                link: "/general",
            },
        ]
    },

]