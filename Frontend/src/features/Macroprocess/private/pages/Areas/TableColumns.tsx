import { Badge, Text } from "@mantine/core"
import { ActionsAreas } from "../../components"

export const columns = [
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
        render: (row: any) => {
            return (
                <Text size="sm">{row.name}</Text>
            )
        }
    },
    {
        key: 'category',
        label: 'Categoria',
        align: 'center',
        render: (row: any) => {
            return (
                <Badge size="sm">{row.category === "main" ? "Área Principal" : "Área de Soporte"}</Badge>
            )
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row: any) => {
            return <ActionsAreas {...row} />
        }
    },
]