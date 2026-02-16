import { Button, Card, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import styles from "./Derechohabiencia.module.css"
import * as TablerIcons from "@tabler/icons-react";

export const Derechohabiencia = ({ color, icon, title, description, links }: any) => {
    const Icon =
        icon &&
        (TablerIcons as any)[icon];

    return (
        <Card padding={"lg"} h={"100%"} mih={"300px"}>
            <Stack h={"100%"}>
                <div className={styles.item}>
                    <ThemeIcon variant="light" color={color} className={styles.itemIcon} size={45} radius="md">
                        <Icon size={40} />
                    </ThemeIcon>

                    <div>
                        <Title order={4} className={styles.itemTitle}>
                            {title}
                        </Title>
                    </div>
                </div>

                <Text size="sm">
                    {description}
                </Text>

                <Stack gap={"xs"} mt={"auto"}>
                    {links.map((link: any, index: number) => (
                        <Button
                            key={index}
                            variant="light"
                            color="gray"
                            justify="space-between"
                            rightSection={
                                <TablerIcons.IconExternalLink
                                    size={16}
                                />
                            }
                            component="a"
                            href={link.url}
                            target="_blank"
                        >
                            {link.title}
                        </Button>
                    ))}
                </Stack>
            </Stack>
        </Card>
    )
}