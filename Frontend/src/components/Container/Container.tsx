import { Stack, Text, Title, Container as MantineContainer } from "@mantine/core"
import type { ReactNode } from "react";

interface Props {
    title: string;
    description: string
    children: ReactNode
}

export const Container = ({ title, description, children }: Props) => {
    return (
        <MantineContainer size="lg">
            <Stack gap={"lg"}>
                <Stack gap={"xs"}>
                    <Title order={2}>
                        {title}
                    </Title>

                    <Text c="dimmed">{description}</Text>
                </Stack>

                {children}
            </Stack>
        </MantineContainer>
    )
}