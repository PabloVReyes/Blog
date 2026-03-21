import { Container } from "@/components"
import { useEffect, useState } from "react"
import { fetchSystems } from "../api"
import { SimpleGrid } from "@mantine/core"
import { Alert } from "@/ui"
import { System } from "../components"
import type { SystemData } from "../../types/systems.types"

export const Systems = () => {
    const [data, setData] = useState<SystemData[] | []>([])

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
                    <System
                        key={index}
                        {...item}
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