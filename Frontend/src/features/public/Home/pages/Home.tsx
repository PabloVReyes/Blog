import { Card, Container, Group, SimpleGrid, Space, Stack, Text } from "@mantine/core"
import styles from "./Home.module.css"
import { AccessCard, Calendar, Carousel, Derechohabiencia } from "../components"
import { IconHandLoveYou } from "@tabler/icons-react"

export const Home = () => {
    return (
        <Container>
            <Stack>
                <Card
                    withBorder
                    radius={15}
                    p="lg"
                    style={{ backgroundColor: "#ecfdf5", borderColor: "#a4f4cf" }}
                >
                    <Group align="center" gap="xs" mb="sm">
                        <IconHandLoveYou color="#004f3b"/>
                        <Text fw={600} fz="lg" c="#004f3b">
                            ¡Bienvenido al sistema renovado!
                        </Text>
                    </Group>
                    <Text fz="sm" color="#004f3b">
                        Hemos evolucionado nuestra plataforma para ofrecerte un entorno más moderno, ágil y funcional, manteniendo todo lo que ya conoces y agregando nuevas mejoras pensadas para ti.
                    </Text>
                    <Space />
                    <Text size="xs" c="dimmed" fs="italic">
                        - Pablo Vazquez Reyes
                    </Text>
                </Card>

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