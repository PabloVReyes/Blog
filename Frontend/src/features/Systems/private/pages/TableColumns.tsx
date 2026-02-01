import { ThemeIcon } from "@mantine/core"
import * as TablerIcons from "@tabler/icons-react";
import { Actions } from "../components";

export const columns = [
    {
        key: 'icon',
        label: 'Icono',
        align: 'center',
        render: (row: any) => {
            const Icon =
                row.icon &&
                (TablerIcons as any)[row.icon];
            return (
                <ThemeIcon
                    size={50}
                    color={row.color}
                    variant="light"
                    style={{
                        '--icon-rgb': row.color || "#40c057" // fallback green
                    } as React.CSSProperties}
                    className="themeIcon"
                >
                    <Icon />
                </ThemeIcon>
            )
        }
    },
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
    },
    {
        key: 'description',
        label: 'Descripcion',
        align: 'left',
    },
    {
        key: 'url',
        label: 'Enlace',
        align: 'left',
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'left',
        render: (row: any) => {
            return <Actions {...row} />
        }
    },
]