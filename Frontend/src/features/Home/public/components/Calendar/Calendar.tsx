import { Badge, Button, Card, Stack, Text, Title } from "@mantine/core"
import classes from "./Calendar.module.css"
import * as TablerIcons from "@tabler/icons-react";
import { getTablerIcon } from "@/helpers";
import { useDownloadFile } from "@/hooks";
import type { CalendarData } from "@/features/Home/types/calendar.types";
import { ThemeIcon } from "@/components";


export const Calendar = ({ title, color, year, description, file, icon }: CalendarData) => {
    const { download } = useDownloadFile()
    const Icon = getTablerIcon(icon)
    return (
        <Card padding={"lg"} h={"100%"}>
            <Stack h={"100%"}>
                <Badge variant="filled" className={classes.rating} color="red" size="sm">
                    {year}
                </Badge>
                <div className={classes.item}>
                    <ThemeIcon
                        className={classes.itemIcon}
                        color={color}
                        size={45}
                    >
                        <Icon />
                    </ThemeIcon>

                    <div>
                        <Title order={4} className={classes.itemTitle}>
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
        </Card >
    )
}