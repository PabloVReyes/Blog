import { Center, Container, Grid, Group, Loader, Stack, Text } from "@mantine/core";
import { AccessCard, Calendar, Carousel, Derechohabiencia } from "../components";
import { Notify } from "@/ui";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { fetchHomeSections } from "../api";
import { getTablerIcon } from "@/helpers";
import type { CarouselData } from "../../types/carousel.types";
import type { CalendarData } from "../../types/calendar.types";
import type { AccessCardData } from "../../types/accessCard.types";
import { Alert } from "@/components";

export interface Data {
    id: string;
    key: string;
    title: string;
    type: string;
    isActive: boolean;
    orderIndex: number;
    createdAt: Date;
    updatedAt: Date;
    carouselItems: CarouselData[];
    accessCards: AccessCardData[];
    derechohabiencia: AlertData;
    alert: AlertData | null;
    calendar: CalendarData;
}

export interface AlertData {
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
    links: Link[];
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

export const Home = () => {
    const isDesktop = useMediaQuery("(min-width: 1400px)");
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        fetchHomeSections()
            .then(setData)
            .catch((error: unknown) => {
                Notify({
                    type: "error",
                    title: "Error al cargar la página de inicio",
                    message: error instanceof Error ? error.message : "Error desconocido"
                });
            });
    }, []);

    if (data.length === 0) return <Center h={"100%"}><Loader /></Center>;

    const alertSection = data.find((s) => s.type === "ALERT" && s.alert?.isActive);
    const carouselSection = data.find((s) => s.type === "CAROUSEL");
    const calendarSection = data.find((s) => s.type === "CALENDAR");
    const derechoSection = data.find((s) => s.type === "DERECHOHABIENCIA");
    const accessCardSection = data.find((s) => s.type === "ACCESS_CARD");

    const IconComponent = getTablerIcon(alertSection?.alert?.icon)

    return (
        <Container size={"xl"}>
            <Stack>
                {/* 1️⃣ ALERT */}
                {alertSection && (
                    <Alert
                        color={alertSection.alert ? alertSection.alert.color : "emerald"}
                        title={
                            <Group align="center" gap="xs" mb="sm" wrap="nowrap">
                                {alertSection.alert?.icon &&
                                    <IconComponent style={{ flex: "0 0 auto" }} />
                                }
                                <Text fw={600} fz="lg">
                                    {alertSection.alert?.title}
                                </Text>
                            </Group>
                        }
                        content={
                            <Stack gap={5}>
                                <Text fz="sm">{alertSection.alert?.description}</Text>
                                {alertSection.alert?.author && (
                                    <Text size="xs" c="dimmed" fs="italic">
                                        - {alertSection.alert.author}
                                    </Text>
                                )}
                            </Stack>
                        }
                    />
                )}

                {/* 2️⃣ GRID Carousel + Calendar/Derechohabiencia */}
                <Grid gutter="md" align="flex-start">
                    <Grid.Col
                        span={isDesktop ? 9 : 12}
                        style={{ alignSelf: 'stretch' }} // 👈 Esto hace que SOLO esta columna se estire
                    >
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {carouselSection && <Carousel items={carouselSection.carouselItems} />}
                        </div>
                    </Grid.Col>

                    <Grid.Col span={isDesktop ? 3 : 12}>
                        <Stack gap="md">
                            {calendarSection && <Calendar  {...calendarSection.calendar} />}
                            {derechoSection && (
                                <Derechohabiencia {...derechoSection.derechohabiencia} />
                            )}
                        </Stack>
                    </Grid.Col>
                </Grid>

                {/* 3️⃣ AccessCard */}
                {accessCardSection && accessCardSection.accessCards.length > 0 && <AccessCard {...accessCardSection} />}
            </Stack>
        </Container>
    );
};
