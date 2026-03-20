import { Badge, Button, Card, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import styles from "./Calendar.module.css"
import { downloadCalendar } from "../../api";
import * as TablerIcons from "@tabler/icons-react";
import { getTablerIcon } from "@/helpers";

interface Props {
    id: string;
    title: string;
    color: string;
    year: number;
    description: string;
    fileName?: string | null;
    icon: string
}

export const Calendar = ({ id, title, color, year, description, fileName, icon }: Props) => {
    const download = async (id: string) => {
        try {
            const response = await downloadCalendar(id)

            const disposition = response.headers["content-disposition"];

            const fileName =
                disposition?.split("filename=")[1]?.replace(/"/g, "") ||
                "manual.pdf";

            const blob = new Blob([response.data], {
                type: response.headers["content-type"]
            });

            const link = document.createElement("a");

            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(link.href);

        } catch (error) {
            console.error("Error al descargar archivo", error);
        }
    };

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
                    disabled={!fileName}
                    onClick={() => download(id)}
                >
                    Descargar PDF
                </Button>
            </Stack>
        </Card>
    )
}