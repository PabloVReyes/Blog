import { Container, Grid, Group, SimpleGrid, Stack, Title } from "@mantine/core"
import classes from "./style.module.css";
import { CmpCard, CmpCarousel } from "../../components";
import { useEffect } from "react";
import { usePrivateHomeSectionStore } from "@/store/pages/homeStore";

const PRIMARY_COL_HEIGHT = '50dvh';

export const Home = () => {
    const { isFetching, fetchSections, items } = usePrivateHomeSectionStore()

    useEffect(() => {
        fetchSections()
    }, [])

    if (isFetching) return <>Cargando</>

    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    return (
        <Container>
            <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Inicio</Title>
                    </Stack>
                </Group>

                <SimpleGrid cols={12} spacing="md">
                    <div className={classes.colMain}>
                        <CmpCarousel />
                    </div>

                    <div className={classes.colSide}>
                        <Grid gutter="md">
                            <Grid.Col>
                                <CmpCard
                                    height={SECONDARY_COL_HEIGHT}
                                    {...items[0]}
                                />
                            </Grid.Col>
                            <Grid.Col>
                                <CmpCard
                                    height={SECONDARY_COL_HEIGHT}
                                    {...items[1]}
                                />
                            </Grid.Col>
                        </Grid>
                    </div>
                </SimpleGrid>

                <Grid gutter="md">
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <CmpCard
                            height={SECONDARY_COL_HEIGHT}
                            {...items[2]}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <CmpCard
                            height={SECONDARY_COL_HEIGHT}
                            {...items[3]}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <CmpCard
                            height={SECONDARY_COL_HEIGHT}
                            {...items[4]}
                        />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    )
}
