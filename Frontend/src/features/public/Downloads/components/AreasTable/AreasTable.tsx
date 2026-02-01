import { ActionIcon, Card, SimpleGrid, Stack, Text } from "@mantine/core"
import { areas } from "./areas"
import styles from "./AreasTable.module.css"

export const AreasTable = () => {
    return (
        <Card>
            <SimpleGrid cols={5} spacing={"lg"} style={{ textAlign: "center" }}>
                {areas.map((area) => (
                    <Stack
                        align="center"
                        gap="sm"
                        key={area.id}
                        className={styles.button}
                        mt={20}
                    >
                        <ActionIcon
                            size={96}
                            radius="50%"
                            color={area.color}
                            className={`${styles.circle} ${area.color}`}
                            variant="filled"
                        >
                            <area.icon size={40} className={styles.icon} />
                        </ActionIcon>

                        <Text
                            size="md"
                            fw={700}
                            ta="center"
                            className={styles.text}
                        >
                            {area.name}
                        </Text>
                    </Stack>
                ))}
            </SimpleGrid>
        </Card>
    )
}


