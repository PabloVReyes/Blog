import { Table } from "@/components"
import { Card, Stack, Title } from "@mantine/core"
import { columns } from "./TableColumns"
import { useEffect } from "react"
import { useAlertStore } from "../../store"
import { Notify } from "@/ui"

export const Alert = () => {
    const { fetch, items, isLoading } = useAlertStore()

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener alertas",
                message: error.message
            })
        }
    }

    return (
        <Card>
            <Stack>
                <Card.Section withBorder>
                    <Title order={4}>Alerta</Title>
                </Card.Section>
                <Card>
                    <Table
                        columns={columns}
                        data={items}
                        isLoading={isLoading}
                    />
                </Card>
            </Stack>
        </Card>
    )
}