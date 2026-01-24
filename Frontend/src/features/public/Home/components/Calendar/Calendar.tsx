import { Badge, Button, Card, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import styles from "./styles.module.css"
import { IconCalendarWeek, IconFileDownload } from "@tabler/icons-react"

export const Calendar = () => {
    return (
        <Card padding={"lg"} h={"100%"}>
            <Stack>
                <Badge className={styles.rating} color="red" size="sm">
                    2025
                </Badge>
                <div className={styles.item}>
                    <ThemeIcon variant="light" color="green" className={styles.itemIcon} size={45} radius="md">
                        <IconCalendarWeek size={40} />
                    </ThemeIcon>

                    <div>
                        <Title order={4} className={styles.itemTitle}>
                            Calendario de Comités Intrahospitalarios
                        </Title>
                    </div>
                </div>

                <Text size="sm">
                    Consulta fechas importantes y eventos programados
                </Text>

                <Button
                    color="green"
                    leftSection={
                        <IconFileDownload size={18} />
                    }
                >
                    Descargar PDF
                </Button>
            </Stack>
        </Card>
    )
}