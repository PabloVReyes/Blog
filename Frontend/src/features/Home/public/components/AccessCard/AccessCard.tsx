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
import { IconArrowNarrowRight } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom";
import { downloadAccessCard } from "../../api";
import { getTablerIcon } from "@/helpers";

interface AccessCardProps {
    id: string;
    title: string;
    badge: null;
    color: string;
    description: string;
    icon: string;
    url: string;
    type: string;
    fileName: null;
    storedName: null;
    filePath: null;
    fileSize: null;
    mimeType: null;
    orderIndex: number;
    isActive: boolean;
    sectionId: string;
}

interface Props {
    accessCards: AccessCardProps[]
}

interface handleNavigateProps {
    type: string;
    url: string;
    id: string
}

export const AccessCard = ({ accessCards }: Props) => {
    const navigate = useNavigate();

    const download = async (id: string) => {
        try {
            const response = await downloadAccessCard(id)

            const blob = new Blob([response.data], {
                type: "application/pdf",
            });

            const url = window.URL.createObjectURL(blob);

            window.open(url, "_blank");

            // Opcional: liberar memoria después de un tiempo
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);


        } catch (error) {
            console.error("Error al descargar archivo", error);
        }
    };

    const handleNavigate = ({ type, url, id }: handleNavigateProps) => {
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
            download(id)
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
                            onClick={() => handleNavigate({ ...system })}
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
                                        <IconArrowNarrowRight
                                            size={20}
                                            className={styles.arrow}
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