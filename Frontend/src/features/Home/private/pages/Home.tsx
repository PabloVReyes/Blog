import { Container } from "@/components"
import { Center, Loader, Stack } from "@mantine/core"
import { useEffect, useState } from "react"
import { fetchSections } from "../api"
import { Carousel } from "./Carousel"
import { Alert } from "./Alert"
import { Derechohabiencia } from "./Derechohabiencia"
import { Calendar } from "./Calendar"
import { AccessCard } from "./AcessCard"
import { Notify } from "@/ui"

export interface Sections {
    id: string;
    key: string;
    title: string;
    type: string;
    isActive: boolean;
    orderIndex: number;
    createdAt: Date;
    updatedAt: Date;
    carouselItems: CarouselItem[];
    accessCards: AccessCard[];
    derechohabiencia: Alert | null;
    alert: Alert | null;
    calendar: Calendar | null;
}

export interface AccessCard {
    id: string;
    title: string;
    badge: null;
    color: string;
    description: string;
    icon: string;
    url: string;
    type: string;
    fileName: null;
    storedName: null;
    filePath: null;
    fileSize: null;
    mimeType: null;
    orderIndex: number;
    isActive: boolean;
    sectionId: string;
}

export interface Alert {
    id: string;
    title: string;
    description: string;
    author?: string;
    color: string;
    icon: string;
    isActive?: boolean;
    sectionId: string;
    createdAt: Date;
    updatedAt: Date;
    links?: Link[];
}

export interface Link {
    id: string;
    title: string;
    url: string;
    orderIndex: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    derechohabienciaConfigId: string;
}

export interface Calendar {
    id: string;
    year: number;
    title: string;
    icon: string;
    color: string;
    description: string;
    sectionId: string;
    fileName: null;
    storedName: null;
    filePath: null;
    fileSize: null;
    mimeType: null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CarouselItem {
    id: string;
    imageName: string;
    imageUrl: string;
    imagePath: string;
    type: string;
    title: string;
    description: string;
    orderIndex: number;
    isActive: boolean;
    url: null;
    fileName: null | string;
    storedName: null | string;
    filePath: null | string;
    fileSize: number | null;
    mimeType: null | string;
    sectionId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const Home = () => {
    const [sections, setSections] = useState<Sections[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = async () => {
        setLoading(true)
        try {
            await fetchSections()
                .then(setSections)
        } catch (error) {
            Notify({
                type: "error",
                message: "Error al cargar las secciones",
            })
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
            <Stack gap={100}>
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