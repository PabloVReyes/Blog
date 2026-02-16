import { Table, Text, ThemeIcon } from "@mantine/core"
import * as TablerIcons from "@tabler/icons-react";
import { ActionsDerechohabiencia } from "../../components";
import styles from "./Derechohabiencia.module.css"

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
        key: 'links',
        label: 'Links',
        align: 'left',
        render: (row: any) => {
            const rows = row.links.map((link: any, index: number) => (
                <Table.Tr key={index}>
                    <Table.Th>
                        <Text size="sm" fw={700}>
                            {link.title}
                        </Text>
                    </Table.Th>
                    <Table.Td>{link.url}</Table.Td>
                </Table.Tr>
            ))

            return (
                <Table variant="vertical"
                    classNames={{
                        th: styles.th,
                    }}
                >
                    <Table.Tbody>
                        {rows}
                    </Table.Tbody>
                </Table >
            )
        }
    },
    {
        key: 'actions',
        label: "Acciones",
        align: "center",
        render: (row: any) => {
            return <ActionsDerechohabiencia {...row} />
        }
    }
]