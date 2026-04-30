import { Button, Card, Stack, Text, Title } from "@mantine/core"
import styles from "./Derechohabiencia.module.css"
import * as TablerIcons from "@tabler/icons-react";
import { getTablerIcon } from "@/helpers";
import { ThemeIcon } from "@/components";

interface Props {
    color: string;
    icon: string;
    title: string;
    description: string;
    links: Link[];
}

interface Link {
    url: string;
    title: string;
}

export const Derechohabiencia = ({ color, icon, title, description, links }: Props) => {
    const Icon = getTablerIcon(icon)

    return (
        <Card padding={"lg"} h={"100%"}>
            <Stack h={"100%"}>
                <div className={styles.item}>
                    <ThemeIcon
                        color={color}
                        size={45}
                        className={styles.itemIcon}
                    >
                        <Icon />
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
                    {links.map((link) => (
                        <Button
                            key={link.title}
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