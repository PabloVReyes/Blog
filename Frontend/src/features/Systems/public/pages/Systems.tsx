import { Card, Container } from "@/components"
import { useEffect, useState } from "react"
import { type SystemProps } from "../../types"
import { fetchSystems } from "../api"
import { SimpleGrid, Card as MantineCard, Text } from "@mantine/core"

export const Systems = () => {
    const [data, setData] = useState<SystemProps[] | []>([])

    useEffect(() => {
        fetchSystems()
            .then(setData)
    }, [])

    return (
        <Container
            title="Sistemas de consultas"
            description="Accede a los diferentes sistemas de información institucionales"
        >
            <SimpleGrid cols={{ sm: 1, md: 2, lg: 3 }}>
                {data.map((item, index: number) => (
                    <Card
                        key={index}
                        type="system"
                        variant="vertical"
                        {...item}
                        submitLabel="Acceder al sistema"
                    />
                ))}
            </SimpleGrid>

            <MantineCard
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
            </MantineCard>
        </Container>
    )
}