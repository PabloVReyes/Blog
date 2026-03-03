import { Card as MantineCard, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import styles from "./Card.module.css"

interface Props {
    Icon: any;
    title: string;
    color: string;
    content: any;
}

export const Card = ({ Icon, title, content, color }: Props) => {
    return (
        <MantineCard padding={"lg"} h={"100%"}>
            <Stack>
                <div className={styles.item}>
                    <ThemeIcon variant="light" color={color} className={styles.itemIcon} size={45} radius="md">
                        <Icon size={40} />
                    </ThemeIcon>

                    <div>
                        <Title order={3} className={styles.itemTitle}>
                            {title}
                        </Title>
                    </div>
                </div>

                <Text>
                    {content}
                </Text>
            </Stack>
        </MantineCard>
    )
}