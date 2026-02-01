import { Badge, Button, Flex, Group, Card as MantineCard, Stack, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core"
import styles from "./Card.module.css"
import * as TablerIcons from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface Props {
    type: "system" | "file" | "directory"
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
}

export const Card = ({
    type,
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
    email
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
            onClick={type === "system" ? handleNavigate : undefined}
            style={{
                cursor: type === "system" ? "pointer" : "default",
                position: "relative"
            }}
            className={styles.group}
        >
            {type === "system" && variant === "vertical" &&
                (
                    <Stack gap={"xs"} h={"100%"}>
                        <ThemeIcon
                            size={56}
                            color={color}
                            variant="light"
                            className={`${styles.iconWrapper}`}
                            style={{
                                '--icon-rgb': color || "#40c057" // fallback green
                            } as React.CSSProperties}
                        >
                            <Icon size={28} />
                        </ThemeIcon>

                        <Title order={4} className={styles.itemTitle}>
                            {name}
                        </Title>

                        {description && (
                            <Text size="sm">
                                {description}
                            </Text>
                        )}


                        <Button
                            mt={"auto"}
                            variant="subtle"
                            px={0}
                            className={styles.action}
                            rightSection={
                                <TablerIcons.IconArrowNarrowRight
                                    size={20}
                                    className={styles.arrow}
                                />
                            }
                        >
                            {submitLabel}
                        </Button>
                    </Stack>
                )
            }
            {type === "system" && variant === "horizontal" &&
                <Flex justify="space-between" align="flex-start">
                    <Flex gap="md" align="flex-start" style={{ flex: 1 }}>
                        <ThemeIcon
                            size={56}
                            color={color}
                            variant="light"
                            className={`${styles.iconWrapper}`}
                            style={{
                                '--icon-rgb': color || "#40c057" // fallback green
                            } as React.CSSProperties}
                        >
                            <Icon size={28} />
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1 }}>
                            <Group gap="sm">
                                <Title order={5}>{name}</Title>
                                {badge &&
                                    <Badge color="red" size="xs">
                                        {badge}
                                    </Badge>
                                }
                            </Group>

                            <Text size="sm">
                                {description}
                            </Text>

                            {submitLabel &&
                                <Button
                                    mt={"auto"}
                                    variant="subtle"
                                    px={0}
                                    className={styles.action}
                                    rightSection={
                                        <TablerIcons.IconArrowNarrowRight
                                            size={20}
                                            className={styles.arrow}
                                        />
                                    }
                                >
                                    {submitLabel}
                                </Button>
                            }
                        </Stack>
                    </Flex>
                </Flex>
            }
            {type === "directory" &&
                <Flex justify="space-between" align="flex-start">
                    <Flex gap="md" align="flex-start" style={{ flex: 1 }}>
                        <ThemeIcon
                            size={56}
                            variant="light"
                            className={`${styles.iconWrapper}`}
                            style={{
                                '--icon-rgb': theme.primaryColor || "#40c057" // fallback green
                            } as React.CSSProperties}
                        >
                            <Text fw={700}>{phone}</Text>
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1 }}>
                            <Group gap="sm">
                                <Title order={5} mt={10}>{name}</Title>

                                {level && (
                                    <Badge color="red" size="xs" className={styles.rating}>
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
            {/* <Flex justify="space-between" align="flex-start">
                <Flex gap="md" align="flex-start" style={{ flex: 1 }}>
                    <ThemeIcon
                        size={56}
                        color={color}
                        variant="light"
                        style={{
                            '--icon-rgb': mantineColorsRGB[color] || "22,163,74" // fallback green
                        } as React.CSSProperties}
                        className={`${styles.itemIcon} ${styles.iconWrapper}`}

                    >
                        <Icon size={28} />
                    </ThemeIcon>

                    <Stack gap={4} style={{ flex: 1 }}>
                        <Group gap="sm">
                            <Title order={5}>{name}</Title>
                            {badge &&
                                <Badge color="green" variant="light" size="xs">
                                    {badge}
                                </Badge>
                            }
                        </Group>

                        <Text size="sm" color="gray.7">
                            {description}
                        </Text>
                    </Stack>
                </Flex>

                <Group gap={2}>
                    <Button
                        variant="subtle"
                        color="gray"
                        p={6}
                        radius="md"
                        style={{ minWidth: 0 }}
                    >
                        <IconDownload size={20} />
                    </Button>
                    <Button
                        variant="subtle"
                        p={6}
                        color="gray"
                        radius="md"
                        style={{ minWidth: 0 }}
                    >
                        <IconExternalLink size={20} />
                    </Button>
                </Group>
            </Flex> */}
        </MantineCard>
    )
}