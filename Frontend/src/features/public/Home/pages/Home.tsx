import { Container, SimpleGrid, Stack } from "@mantine/core"
import styles from "./styles.module.css"
import { AccessCard, Calendar, Carousel, Derechohabiencia } from "../components"

export const Home = () => {
    return (
        <Container>
            <Stack>
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
        </Container>
    )
}