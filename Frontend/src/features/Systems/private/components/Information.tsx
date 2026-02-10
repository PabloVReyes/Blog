import { Button, Card, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import type { SystemProps } from "../../types"
import * as TablerIcons from "@tabler/icons-react";
import { useModalStore } from "@/layout";


export const Information = ({ icon, color, name, description, url }: SystemProps) => {
    const { closeModal } = useModalStore()
    const Icon =
        icon &&
        (TablerIcons as any)[icon];

    return (
        <>
            <Card>
                <Stack gap={"xs"} h={"100%"}>
                    <ThemeIcon
                        size={50}
                        color={color}
                        variant="light"
                        style={{
                            '--icon-rgb': color || "#40c057" // fallback green
                        } as React.CSSProperties}
                        className="themeIcon"
                    >
                        <Icon size={28} />
                    </ThemeIcon>

                    <Title order={4} className="itemTitle">
                        {name}
                    </Title>

                    {description && (
                        <Text size="sm">
                            {description}
                        </Text>
                    )}

                    <Text size="xs" c="dimmed"><Text span fw={700}>URL:</Text> {url}</Text>
                </Stack>
            </Card>
            <Group justify="flex-end">
                <Button
                    variant="outline"
                    onClick={closeModal}
                >
                    Cerrar
                </Button>
            </Group>
        </>
    )
}