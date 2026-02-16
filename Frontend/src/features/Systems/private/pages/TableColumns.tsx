import { Text, ThemeIcon } from "@mantine/core"
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
        key: 'acronym',
        label: 'Nombre corto',
        align: 'left',
        render: (row: any) => {
            if (!row.acronym) {
                return <Text size="xs" c="dimmed">------</Text>
            }

            return <Text size="sm">{row.acronym}</Text>
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
        render: (row: any) => {
            if (!row.url) {
                return <Text size="xs" c="dimmed">Sin enlace</Text>
            }

            return <Text size="sm">{row.url}</Text>
        }
    },
    {
        key: "file",
        label: "Archivo",
        align: "left",
        render: (row: any) => {
            if (!row.fileName) {
                return <Text size="xs" c="dimmed">Sin archivo</Text>
            }

            return <Text
                style={{
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                }}
                size="sm"
            >
                {row.fileName}
            </Text>
        }
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