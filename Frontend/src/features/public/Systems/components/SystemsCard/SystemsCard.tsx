import { Button, Card, Grid, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import { systems } from "./systems"
import styles from "./styles.module.css"
import { IconArrowNarrowRight } from "@tabler/icons-react"
import { mantineColorsRGB } from "@/shared"

export const SystemsCard = () => {
    return (
        <Grid columns={12}>
            {systems.map((system) => (
                <Grid.Col span={4}>
                    <Card
                        h={"100%"}
                        p="lg"
                        withBorder
                        style={{ cursor: "pointer", position: "relative" }}
                        className={styles.group}
                    >
                        <Stack gap={"xs"} h={"100%"}>
                            <ThemeIcon
                                size={56}
                                color={system.color}
                                variant="light"
                                className={`${styles.itemIcon} ${styles.iconWrapper}`}
                                style={{
                                    '--icon-rgb': mantineColorsRGB[system.color] || "22,163,74" // fallback green
                                } as React.CSSProperties}
                            >
                                <system.icon size={28} />
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
                                color="green"
                                px={0}
                                className={styles.action}
                                rightSection={
                                    <IconArrowNarrowRight
                                        size={20}
                                        className={styles.arrow}
                                    />
                                }
                            >
                                Acceder al sistema
                            </Button>
                        </Stack>
                    </Card>
                </Grid.Col>
            ))}
        </Grid>
    )
}