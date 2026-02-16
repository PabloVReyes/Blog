import { Badge, Button, Card, Flex, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import { standards } from "./standards"
import { IconDownload, IconExternalLink, IconFileText } from "@tabler/icons-react"
import styles from "./Standards.module.css"

export const StandardsCard = () => {
    return standards.map((standard) => (
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
                            '--icon-rgb': "green" || "22,163,74" // fallback green
                        } as React.CSSProperties}
                        className={`${styles.itemIcon} ${styles.iconWrapper}`}

                    >
                        <IconFileText size={28} />
                    </ThemeIcon>

                    <Stack gap={4} style={{ flex: 1 }}>
                        <Group gap="sm">
                            <Title order={5}>{standard.code}</Title>
                            <Badge color="green" variant="light" size="xs">
                                {standard.validity}
                            </Badge>
                        </Group>

                        <Text size="sm" color="gray.7">
                            {standard.title}
                        </Text>

                        <Badge color="gray" variant="light" size="xs">
                            {standard.category}
                        </Badge>
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