import { Badge, Button, Flex, Group, Card as MantineCard, Stack, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core"
import styles from "./Card.module.css"
import * as TablerIcons from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { colorMap } from "../ColorSelect/colors";

interface Props {
    card: "system" | "file" | "directory"
    variant?: "vertical" | "horizontal"
    name: string;
    badge?: string;
    description?: string;
    icon?: any
    color?: string
    url?: string
    submitLabel?: string;
    phone?: string;
    boss?: string;
    level?: string;
    secretary?: string;
    email?: string;
    acronym?: string;
}

export const Card = ({
    card,
    name,
    badge,
    description,
    icon,
    color,
    url,
    submitLabel,
    phone,
    variant = "horizontal",
    level,
    boss,
    secretary,
    email,
}: Props) => {
    const navigate = useNavigate();
    const theme = useMantineTheme()

    const Icon =
        icon &&
        (TablerIcons as any)[icon];

    const handleNavigate = () => {
        if (!url) return;

        // externa
        if (url.startsWith("http")) {
            window.open(url, "_blank"); // o window.location.href = url;
        } else {
            // interna SPA
            navigate(url);
        }
    };

    return (
        <MantineCard
            h={'100%'}
            p={"lg"}
            onClick={card === "system" ? handleNavigate : undefined}
            style={{
                cursor: card === "system" ? "pointer" : "default",
                position: "relative"
            }}
            className={styles.group}
        >
            {card === "directory" &&
                <Flex justify="space-between" align="flex-start">
                    <Flex gap="md" align="flex-start" style={{ flex: 1 }}>
                        <ThemeIcon
                            autoContrast
                            size={56}
                            variant="light"
                            className={`${styles.iconWrapper}`}
                            style={{
                                '--icon-rgb': `${colorMap[theme.primaryColor]}` || "#40c057" // fallback green
                            } as React.CSSProperties}
                        >
                            <Text fw={700}>{phone}</Text>
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1 }}>
                            <Group gap="sm">
                                <Title order={5} mt={10}>{name}</Title>

                                {level && (
                                    <Badge size="xs" className={styles.rating}>
                                        {level}
                                    </Badge>
                                )}
                            </Group>

                            {boss && (
                                <Text size="sm">
                                    <Text span c={theme.primaryColor} fw={700}>Jefe(a):</Text> {boss}
                                </Text>
                            )}

                            {secretary && (
                                <Text size="sm">
                                    <Text span c={theme.primaryColor} fw={700}>Secretario(a):</Text> {secretary}
                                </Text>
                            )}

                            {email && (
                                <Text size="sm" >
                                    <Text span c={theme.primaryColor} fw={700}>Correo electrónico:</Text> {email}
                                </Text>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            }
        </MantineCard>
    )
}