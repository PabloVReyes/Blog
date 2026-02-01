import { Badge, Button, Card, Flex, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import { IconDownload, IconExternalLink, IconGavel } from "@tabler/icons-react"
import styles from "./Statutes.module.css"
import { mantineColorsRGB } from "@/shared"
import { statutes } from "./statutes"

export const StatutesCard = () => {
    return statutes.map((statute) => (
        <Card
            className={styles.group}
        >
            <Flex justify="space-between" align="flex-start">
                <Flex gap="md" align="flex-start" style={{ flex: 1 }}>
                    <ThemeIcon
                        size={56}
                        color="green"
                        variant="light"
                        style={{
                            '--icon-rgb': mantineColorsRGB["green"] || "22,163,74" // fallback green
                        } as React.CSSProperties}
                        className={`${styles.itemIcon} ${styles.iconWrapper}`}

                    >
                        <IconGavel size={28} />
                    </ThemeIcon>

                    <Stack gap={4} style={{ flex: 1 }}>
                        <Group gap="sm">
                            <Title order={5}>{statute.name}</Title>
                            {statute.badge &&
                                <Badge color="green" variant="light" size="xs">
                                    {statute.badge}
                                </Badge>
                            }
                        </Group>

                        <Text size="sm" color="gray.7">
                            {statute.description}
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
            </Flex>
        </Card>
    ))
}