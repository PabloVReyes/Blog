import { Badge, Text, ThemeIcon } from "@mantine/core"
import * as TablerIcons from "@tabler/icons-react";
import { ActionsCalendar } from "../../components";

export const columns = [
    {
        key: "icon",
        label: "Icono",
        align: "center",
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
        key: 'year',
        label: 'Año',
        align: 'center',
        miw: 75,
        render: (row: any) => {
            return <Badge color="red" size="xs">{row.year}</Badge>
        }
    },
    {
        key: 'file',
        label: 'Archivo',
        align: 'left',
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
        label: "Acciones",
        align: "center",
        render: (row: any) => {
            return <ActionsCalendar {...row} />
        }
    }
]