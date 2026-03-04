import { Card, Text } from "@mantine/core"
import type { ReactNode } from "react";

interface Props {
    color?: "blue" | "emerald" | "red" | "yellow" | "orange" | "cyan"
    title?: string | ReactNode;
    content: string | ReactNode;
}

const AlertColor = (color: string) => {
    return {
        title: `light-dark(var(--color-${color}-900), var(--color-${color}-300))`,
        content: `light-dark(var(--color-${color}-800), var(--color-${color}-300))`,
        backgroud: `light-dark(var(--color-${color}-50), color-mix(in oklab, var(--color-${color}-900) 20%, transparent))`,
        border: `light-dark(var(--color-${color}-200), var(--color-${color}-800))`
    }
}

export const Alert = ({
    color = "emerald",
    title,
    content
}: Props) => {
    return (
        <Card
            withBorder
            p="lg"
            style={{
                backgroundColor: `${AlertColor(color).backgroud}`,
                borderColor: `${AlertColor(color).border}`,
                justifyContent: "center"
            }}
        >
            {title &&
                <Text fw={600} fz="lg" c={AlertColor(color).title}>
                    {title}
                </Text>
            }
            <Text fz="sm" c={AlertColor(color).content}>
                {content}
            </Text>
        </Card>
    )
}