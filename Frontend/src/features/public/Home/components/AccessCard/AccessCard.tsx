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
import { cards } from "./cards"
import styles from "./AccessCard.module.css"
import { IconArrowNarrowRight } from "@tabler/icons-react"
import { mantineColorsRGB } from "@/shared"

export const AccessCard = () => {
    return (
        <>
            <Title order={2}>
                Accesos Rápidos
            </Title>

            <SimpleGrid cols={4}>
                {cards.map((card) => (
                    <Card
                        h={"100%"}
                        p="lg"
                        withBorder
                        style={{ cursor: "pointer", position: "relative" }}
                        className={styles.group}
                    >
                        <Stack gap={"xs"} h={"100%"}>
                            {card.badge && (
                                <Badge
                                    color="red"
                                    size="sm"
                                    className={styles.rating}
                                >
                                    {card.badge}
                                </Badge>
                            )}
                            <ThemeIcon
                                size={56}
                                color={card.color}
                                variant="light"
                                className={`${styles.itemIcon} ${styles.iconWrapper}`}
                                style={{
                                    '--icon-rgb': mantineColorsRGB[card.color] || "22,163,74" // fallback green
                                } as React.CSSProperties}
                            >
                                <card.icon size={28} />
                            </ThemeIcon>

                            <Title order={4} className={styles.itemTitle}>
                                {card.title}
                            </Title>

                            {card.description && (
                                <Text size="sm">
                                    {card.description}
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
                                Acceder
                            </Button>
                        </Stack>
                    </Card>
                ))}
            </SimpleGrid>
        </>
    )
}