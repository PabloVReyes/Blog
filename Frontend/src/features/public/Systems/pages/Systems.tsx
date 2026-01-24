import { Card, Container, Stack, Text, Title } from "@mantine/core"
import { SystemsCard } from "../components"

export const Systems = () => {
    return (
        <Container size="lg">
            <Stack gap={"lg"}>
                <Stack gap={"xs"}>
                    <Title order={2}>
                        Sistemas de Consulta
                    </Title>

                    <Text c="dimmed">Accede a los diferentes sistemas de información institucionales</Text>
                </Stack>

                <SystemsCard/>

                <Card
                    withBorder
                    radius={15}
                    p="lg"
                    style={{ backgroundColor: "#ebf8ff", borderColor: "#bee3f8" }}
                >
                    <Text fw={600} fz="lg" mb="sm" color="blue.9">
                        Información Importante
                    </Text>
                    <Text fz="sm" color="blue.8">
                        Para acceder a los sistemas requieres credenciales institucionales vigentes.
                        Si tienes problemas de acceso, contacta al área de Tecnologías de la Información.
                    </Text>
                </Card>
            </Stack>
        </Container>
    )
}