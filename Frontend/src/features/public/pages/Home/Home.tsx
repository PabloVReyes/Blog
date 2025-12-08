import { Card, Container, Grid, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import classes from "./style.module.css";
import { CmpCarousel } from "../../components";

const PRIMARY_COL_HEIGHT = '50dvh';

export const Home = () => {
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
                                <Card
                                    h={SECONDARY_COL_HEIGHT}
                                >
                                    <Card.Section
                                        withBorder
                                        inheritPadding
                                        py="xs"
                                        style={{ justifyItems: "center" }}
                                    >
                                        <Text fw={500}>Datos generales</Text>
                                    </Card.Section>
                                    <Stack gap="md">

                                    </Stack>
                                </Card>
                            </Grid.Col>
                            <Grid.Col>
                                <Card
                                    h={SECONDARY_COL_HEIGHT}
                                >
                                    <Card.Section
                                        withBorder
                                        inheritPadding
                                        py="xs"
                                        style={{ justifyItems: "center" }}
                                    >
                                        <Text fw={500}>Datos generales</Text>
                                    </Card.Section>
                                    <Stack gap="md">

                                    </Stack>
                                </Card>
                            </Grid.Col>
                        </Grid>
                    </div>
                </SimpleGrid>

                <Grid gutter="md">
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <Card
                            h={SECONDARY_COL_HEIGHT}
                        >
                            <Card.Section
                                withBorder
                                inheritPadding
                                py="xs"
                                style={{ justifyItems: "center" }}
                            >
                                <Text fw={500}>Datos generales</Text>
                            </Card.Section>
                            <Stack gap="md">

                            </Stack>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <Card
                            h={SECONDARY_COL_HEIGHT}
                        >
                            <Card.Section
                                withBorder
                                inheritPadding
                                py="xs"
                                style={{ justifyItems: "center" }}
                            >
                                <Text fw={500}>Datos generales</Text>
                            </Card.Section>
                            <Stack gap="md">

                            </Stack>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <Card
                            h={SECONDARY_COL_HEIGHT}
                        >
                            <Card.Section
                                withBorder
                                inheritPadding
                                py="xs"
                                style={{ justifyItems: "center" }}
                            >
                                <Text fw={500}>Datos generales</Text>
                            </Card.Section>
                            <Stack gap="md">

                            </Stack>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    )
}
