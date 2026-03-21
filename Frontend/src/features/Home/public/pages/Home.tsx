import { Center, Container, Grid, Group, Loader, Stack, Text } from "@mantine/core";
import { AccessCard, Calendar, Carousel, Derechohabiencia } from "../components";
import { Alert } from "@/ui";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { fetchHomeSections } from "../api";
import { getTablerIcon } from "@/helpers";
import type { CarouselData } from "../../types/carousel.types";

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
    accessCards: AccessCard[];
    derechohabiencia: Alert;
    alert: Alert | null;
    calendar: Calendar;
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

export const Home = () => {
    const isDesktop = useMediaQuery("(min-width: 1400px)");
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        fetchHomeSections().then(setData);
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
