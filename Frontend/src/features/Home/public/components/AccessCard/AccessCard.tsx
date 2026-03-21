import {
    Card,
    Text,
    Badge,
    ThemeIcon,
    Stack,
    Button,
    Title,
    SimpleGrid
} from "@mantine/core"
import styles from "./AccessCard.module.css"
import { IconArrowNarrowRight, IconDownload } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom";
import { getTablerIcon } from "@/helpers";
import { useDownloadFile } from "@/hooks";
import type { AccessCardData } from "@/features/Home/types/accessCard.types";

interface Props {
    accessCards: AccessCardData[]
}

interface handleNavigateProps {
    type: string;
    url: string | null;
    file: {
        id: string
    }
}

export const AccessCard = ({ accessCards }: Props) => {
    const navigate = useNavigate();
    const { download } = useDownloadFile()

    const handleNavigate = ({ type, url, file }: handleNavigateProps) => {
        if (type === "page") {
            if (!url) return;

            // externa
            if (url.startsWith("http")) {
                window.open(url, "_blank"); // o window.location.href = url;
            } else {
                // interna SPA
                navigate(url);
            }
        } else {
            download(file.id)
        }
    };

    return (
        <Stack>
            <Title order={2}>
                Accesos Rápidos
            </Title>

            <SimpleGrid cols={{ md: 2, sm: 2, xs: 1, lg: 4 }}>
                {accessCards.map((system, index: number) => {
                    const Icon = getTablerIcon(system.icon)

                    return (
                        <Card
                            key={index}
                            h={"100%"}
                            p="lg"
                            withBorder
                            style={{ cursor: "pointer", position: "relative" }}
                            className={styles.group}
                            onClick={() => handleNavigate({...system})}
                        >
                            <Stack gap={"xs"} h={"100%"}>
                                {system.badge && (
                                    <Badge
                                        variant="filled"
                                        color="red"
                                        size="sm"
                                        className={styles.rating}
                                    >
                                        {system.badge}
                                    </Badge>
                                )}
                                <ThemeIcon
                                    size={56}
                                    color={system.color}
                                    variant="light"
                                    className={`${styles.iconWrapper}`}
                                    style={{
                                        '--icon-rgb': system.color || "#40c057" // fallback green
                                    } as React.CSSProperties}
                                >
                                    <Icon size={28} />
                                </ThemeIcon>

                                <Title order={4} className={styles.itemTitle}>
                                    {system.title}
                                </Title>

                                {system.description && (
                                    <Text size="sm">
                                        {system.description}
                                    </Text>
                                )}

                                <Button
                                    mt={"auto"}
                                    variant="subtle"
                                    px={0}
                                    className={styles.action}
                                    rightSection={
                                        system.type === "page" ?
                                            <IconArrowNarrowRight
                                                size={20}
                                                className={styles.arrow}
                                            />
                                            :
                                            <IconDownload
                                                size={20}
                                                className={styles.download}
                                            />
                                    }
                                >
                                    {system.type === "page" ? "Acceder" : "Descargar"}
                                </Button>
                            </Stack>
                        </Card>
                    )
                })}
            </SimpleGrid>
        </Stack>
    )
}