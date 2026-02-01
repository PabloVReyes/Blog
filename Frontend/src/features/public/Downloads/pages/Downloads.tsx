import { Container, Stack, Text, Title } from "@mantine/core"
import { AreasTable } from "../components"

export const Downloads = () => {
    return (
        <Container size="lg">
            <Stack gap={"lg"}>
                <Title order={2}>
                    Descarga de Información
                </Title>

                <Text c="dimmed">
                    Selecciona el departamento para acceder a la información disponible
                </Text>

                <AreasTable />
            </Stack>
        </Container>
    )
}