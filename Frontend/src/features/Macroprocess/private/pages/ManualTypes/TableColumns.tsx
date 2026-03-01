import { Badge, Text } from "@mantine/core"
import { ActionsManualTypes } from "../../components";

export const columns = [
    {
        key: 'code',
        label: 'Codigo',
        align: 'center',
        render: (row: any) => {
            return (
                <Badge variant="filled" color={row.color} size="sm">
                    {row.id}
                </Badge>
            )
        }
    },
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
                <Badge variant="filled" size="sm">{row.category === "STANDARD" ? "Principal" : "Extra"}</Badge>
            )
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row: any) => {
            return <ActionsManualTypes {...row} />
        }
    },
]