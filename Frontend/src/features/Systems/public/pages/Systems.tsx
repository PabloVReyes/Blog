import { Card, Container } from "@/components"
import { useEffect, useState } from "react"
import { type SystemProps } from "../../types"
import { fetchSystems } from "../api"
import { SimpleGrid } from "@mantine/core"
import { Alert } from "@/ui"

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

            <Alert
                color="blue"
                title="Informacion Importante"
                content="Para acceder a los sistemas requieres credenciales institucionales vigentes.
                Si tienes problemas de acceso, contacta al área de Tecnologías de la Información."
            />
        </Container>
    )
}