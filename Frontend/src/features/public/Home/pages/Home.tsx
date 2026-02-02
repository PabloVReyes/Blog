import { Container, Group, SimpleGrid, Stack, Text } from "@mantine/core"
import styles from "./Home.module.css"
import { AccessCard, Calendar, Carousel, Derechohabiencia } from "../components"
import { IconHandLoveYou } from "@tabler/icons-react"
import { Alert } from "@/ui"

export const Home = () => {
    return (
        <Container>
            <Stack>
                <Alert
                    color="green"
                    title={
                        <Group align="center" gap="xs" mb="sm">
                            <IconHandLoveYou />
                            <Text fw={600} fz="lg">
                                ¡Bienvenido al sistema renovado!
                            </Text>
                        </Group>
                    }
                    content={
                        <Stack gap={5}>
                            <Text fz="sm" >
                                Hemos evolucionado nuestra plataforma para ofrecerte un entorno más moderno, ágil y funcional, manteniendo todo lo que ya conoces y agregando nuevas mejoras pensadas para ti.
                            </Text>
                            <Text size="xs" c="dimmed" fs="italic">
                                - Pablo Vazquez Reyes
                            </Text>
                        </Stack>
                    }
                />

                <SimpleGrid cols={12} spacing="md">
                    <div className={styles.colMain}>
                        <Carousel />
                    </div>

                    <div className={styles.colSide}>
                        <div className={styles.calendar}>
                            <Calendar />
                        </div>

                        <div className={styles.derechohabiencia}>
                            <Derechohabiencia />
                        </div>
                    </div>
                </SimpleGrid>

                <AccessCard />
            </Stack>
        </Container >
    )
}