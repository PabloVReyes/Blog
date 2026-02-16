import { Table } from "@/components"
import { Card, Stack, Title } from "@mantine/core"
import { columns } from "./TableColumns"
import { useDerechohabienciaStore } from "../../store"
import { useEffect } from "react"
import { Notify } from "@/ui"

export const Derechohabiencia = () => {
    const { fetch, items, isLoading } = useDerechohabienciaStore()

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener segunda sección",
                message: error.message
            })
        }
    }

    return (
        <Card>
            <Stack>
                <Card.Section withBorder>
                    <Title order={4}>Segunda Sección</Title>
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