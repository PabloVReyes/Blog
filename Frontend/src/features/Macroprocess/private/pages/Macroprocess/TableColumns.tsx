import { Badge, Text } from "@mantine/core"
import { ActionsMacroprocess } from "../../components"

export const columns = [
    {
        key: 'code',
        label: 'Codigo',
        align: 'center',
        render: (row: any) => {
            return (
                <Badge autoContrast color={row.manualType.color} size="sm">
                    {row.manualType.id}
                </Badge>
            )
        }
    },
    {
        key: 'manualType',
        label: 'Tipo',
        align: 'left',
        render: (row: any) => {
            return (
                <Text size="sm">{row.manualType.name}</Text>
            )
        }
    },
    {
        key: 'area',
        label: 'Área',
        align: 'left',
        render: (row: any) => {
            return (
                <Text size="sm">{row.area.name}</Text>
            )
        }
    },
    {
        key: 'category',
        label: 'Categoria',
        align: 'center',
        render: (row: any) => {
            return (
                <Badge size="sm">{row.area.category === "main" ? "Área principal" : "Área de apoyo"}</Badge>
            )
        }
    },
    {
        key: 'fileName',
        label: 'Archivo',
        align: 'left',
        render: (row: any) => {
            if (!row.storedName) {
                return (
                    <Text size="xs" c="dimmed">Sin archivo</Text>
                )
            }

            return (
                <Text size="sm">{row.fileName}</Text>
            )
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row: any) => {
            return <ActionsMacroprocess {...row} />
        }
    },
]