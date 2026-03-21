import { Badge, Button, Card, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import styles from "./Calendar.module.css"
import * as TablerIcons from "@tabler/icons-react";
import { getTablerIcon } from "@/helpers";
import { useDownloadFile } from "@/hooks";
import type { CalendarData } from "@/features/Home/types/calendar.types";


export const Calendar = ({ title, color, year, description, file, icon }: CalendarData) => {
    const { download } = useDownloadFile()
    const Icon = getTablerIcon(icon)
    return (
        <Card padding={"lg"} h={"100%"}>
            <Stack h={"100%"}>
                <Badge variant="filled" className={styles.rating} color="red" size="sm">
                    {year}
                </Badge>
                <div className={styles.item}>
                    <ThemeIcon variant="light" color={color} className={styles.itemIcon} size={45} radius="md">
                        <Icon size={40} />
                    </ThemeIcon>

                    <div>
                        <Title order={4} className={styles.itemTitle}>
                            {title}
                        </Title>
                    </div>
                </div>

                <Text size="sm">
                    {description}
                </Text>

                <Button
                    mt={"auto"}
                    color={color}
                    leftSection={
                        <TablerIcons.IconFileDownload size={18} />
                    }
                    disabled={!file?.path}
                    onClick={() => download(file.id)}
                >
                    Descargar PDF
                </Button>
            </Stack>
        </Card>
    )
}