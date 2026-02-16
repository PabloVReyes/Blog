import { Container } from "@/components"
import { Center, Loader, Stack } from "@mantine/core"
import { useEffect, useState } from "react"
import { fetchSections } from "../api"
import { Carousel } from "./Carousel/Carousel"
import { Alert } from "./Alert"
import { Derechohabiencia } from "./Derechohabiencia"
import { AccessCard } from "./AccessCard"
import { Calendar } from "./Calendar"

export const Home = () => {
    const [sections, setSections] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = async () => {
        try {
            await fetchSections()
                .then(setSections)

            setLoading(true)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <Center><Loader /></Center>
    }

    return (
        <Container
            title="Inicio"
            description="Configuración del Inicio"
        >
            <Stack>
                {sections.map((section, index: number) => {
                    switch (section.type) {
                        case "ALERT":
                            return <Alert key={index} />
                        case "CAROUSEL":
                            return <Carousel {...section} key={index} />
                        case "CALENDAR":
                            return <Calendar key={index} />
                        case "DERECHOHABIENCIA":
                            return <Derechohabiencia key={index} />
                        case "ACCESS_CARD":
                            return <AccessCard {...section} key={index} />
                    }
                })}
            </Stack>
        </Container>
    )
}