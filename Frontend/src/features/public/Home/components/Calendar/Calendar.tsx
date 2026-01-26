import { Badge, Button, Card, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import styles from "./Calendar.module.css"
import { IconCalendarWeek, IconFileDownload } from "@tabler/icons-react"

export const Calendar = () => {
    return (
        <Card padding={"lg"} h={"100%"}>
            <Stack h={"100%"}>
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
                    mt={"auto"}
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