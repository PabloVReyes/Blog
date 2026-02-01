import { Container, Stack, Text, Title } from "@mantine/core"
import { StatutesCard } from "../components"

export const Juristic = () => {
    return (
        <Container size="lg">
            <Stack gap={"lg"}>
                <Title order={2}>
                    Disposiciones Jurídicas Administrativas.
                </Title>

                <Text c="dimmed">
                    Leyes, Códigos, Reglamentos, Decretos, Lineamientos, Acuerdos, Circulares, Manuales, Guías, Otros                </Text>

                <StatutesCard />
            </Stack>
        </Container>

    )
}