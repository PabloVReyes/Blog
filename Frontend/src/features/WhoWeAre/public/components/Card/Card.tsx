import { Card as MantineCard, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import styles from "./Card.module.css"
import { getTablerIcon } from "@/helpers";
import type { ReactNode } from "react";

interface Props {
    icon: string;
    title: string;
    color: string;
    content: ReactNode;
}

export const Card = ({ icon, title, content, color }: Props) => {
    const Icon = getTablerIcon(icon)
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