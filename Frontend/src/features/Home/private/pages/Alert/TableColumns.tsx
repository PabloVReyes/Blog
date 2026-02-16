import { Badge } from "@mantine/core";
import { ActionsAlert } from "../../components"
import * as TablerIcons from "@tabler/icons-react";

export const columns = [
    {
        key: "type",
        label: "Tipo",
        align: "center",
        miw: 100,
        render: (row: any) => {
            if (row.color === "blue") {
                return <Badge size="xs" autoContrast color="blue">Informativo</Badge>
            }

            if (row.color === "green") {
                return <Badge size="xs" autoContrast color="green">Exitoso</Badge>
            }

            if (row.color === "yellow") {
                return <Badge size="xs" autoContrast color="yellow">Advertencia</Badge>
            }

            if (row.color === "red") {
                return <Badge size="xs" autoContrast color="red">Error</Badge>
            }
        }
    },
    {
        key: 'icon',
        label: 'Icono',
        align: 'center',
        render: (row: any) => {
            const Icon =
                row.icon &&
                (TablerIcons as any)[row.icon];

            return <Icon />
        }
    },
    {
        key: 'title',
        label: 'Titulo',
        align: 'left',
    },
    {
        key: 'description',
        label: 'Descripcion',
        align: 'left',
    },
    {
        key: 'author',
        label: 'Autor',
        align: 'left',
    },
    {
        key: 'file',
        label: 'Visible',
        align: 'center',
        render: (row: any) => {
            if (row.isActive) {
                return <TablerIcons.IconEye />
            } else {
                return <TablerIcons.IconEyeOff />
            }
        }
    },
    {
        key: 'actions',
        label: "Acciones",
        align: "center",
        render: (row: any) => {
            return <ActionsAlert {...row} />
        }
    }
]