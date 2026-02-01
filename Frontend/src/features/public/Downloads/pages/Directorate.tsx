import { Container, Stack, Text, Title } from "@mantine/core"
import { DirectorateTable } from "../components/DirectorateTable/DirectorateTable"

export const Directorate = () => {
    return (
        <Container size="lg">
            <Stack gap={"lg"}>
                <Title order={2}>
                    Dirección
                </Title>

                <Text c="dimmed">
                    Presentaciones Junta de Gobierno
                </Text>

                <DirectorateTable />
            </Stack>
        </Container>
    )
}