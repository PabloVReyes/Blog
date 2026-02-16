import { Center, Container, Grid, Group, Loader, Stack, Text } from "@mantine/core";
import { AccessCard, Calendar, Carousel, Derechohabiencia } from "../components";
import { Alert } from "@/ui";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { fecthHomeSections } from "../api";
import * as TablerIcons from "@tabler/icons-react";

export const Home = () => {
    const isDesktop = useMediaQuery("(min-width: 1400px)");
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fecthHomeSections().then(setData);
    }, []);

    if (data.length === 0) return <Center h={"100%"}><Loader /></Center>;

    // Tomamos las secciones por tipo para mantener el orden exacto
    const alertSection = data.find((s) => s.type === "ALERT" && s.alert.isActive);
    const carouselSection = data.find((s) => s.type === "CAROUSEL");
    const calendarSection = data.find((s) => s.type === "CALENDAR");
    const derechoSection = data.find((s) => s.type === "DERECHOHABIENCIA");
    const accessCardSection = data.find((s) => s.type === "ACCESS_CARD");

    return (
        <Container>
            <Stack>
                {/* 1️⃣ ALERT */}
                {alertSection && (
                    <Alert
                        color={alertSection.alert.color}
                        title={
                            <Group align="center" gap="xs" mb="sm">
                                {alertSection.alert.icon &&
                                    React.createElement(
                                        (TablerIcons as any)[alertSection.alert.icon]
                                    )}
                                <Text fw={600} fz="lg">
                                    {alertSection.alert.title}
                                </Text>
                            </Group>
                        }
                        content={
                            <Stack gap={5}>
                                <Text fz="sm">{alertSection.alert.description}</Text>
                                {alertSection.alert.author && (
                                    <Text size="xs" c="dimmed" fs="italic">
                                        - {alertSection.alert.author}
                                    </Text>
                                )}
                            </Stack>
                        }
                    />
                )}

                {/* 2️⃣ GRID Carousel + Calendar/Derechohabiencia */}
                <Grid gutter="md" align="stretch">
                    <Grid.Col span={isDesktop ? 9 : 12}>
                        {carouselSection && <Carousel items={carouselSection.carouselItems} />}
                    </Grid.Col>

                    <Grid.Col span={isDesktop ? 3 : 12}>
                        <Stack h="100%">
                            {calendarSection && <Calendar  {...calendarSection.calendar} />}
                            {derechoSection && (
                                <Derechohabiencia {...derechoSection.derechoambiencia} />
                            )}
                        </Stack>
                    </Grid.Col>
                </Grid>

                {/* 3️⃣ AccessCard */}
                {accessCardSection && accessCardSection.accessCards.length > 0 && <AccessCard {...accessCardSection}/>}
            </Stack>
        </Container>
    );
};
