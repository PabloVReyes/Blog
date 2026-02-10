import { Card, Text } from "@mantine/core"
import type { ReactNode } from "react";

interface Props {
    color?: "blue" | "green" | "red" | "yellow"
    title: string | ReactNode;
    content: string | ReactNode;
}

const AlertColor = (color: string) => {
    switch (color) {
        case "green":
            return {
                title: "light-dark(oklch(37.8% 0.077 168.94), oklch(84.5% 0.143 164.978))",
                content: "light-dark(oklch(43.2% 0.095 166.913), oklch(76.5% 0.177 163.223))",
                backgroud: "light-dark(oklch(97.9% 0.021 166.113) ,color-mix(in oklab, oklch(37.8% 0.077 168.94) 20%, transparent))",
                border: "light-dark(oklch(90.5% 0.093 164.15),oklch(90.5% 0.093 164.15))"
            }
        case "blue":
            return {
                title: "light-dark(oklch(37.9% 0.146 265.522), oklch(80.9% 0.105 251.813))",
                content: "light-dark(oklch(42.4% 0.199 265.638) ,oklch(70.7% 0.165 254.624))",
                backgroud: "light-dark(oklch(97% 0.014 254.604) ,color-mix(in oklab, oklch(37.9% 0.146 265.522) 20%, transparent))",
                border: "light-dark(oklch(88.2% 0.059 254.128), oklch(42.4% 0.199 265.638))"
            }
        case "red":
            return {
                title: "light-dark(oklch(38.2% 0.155 29.233), oklch(84.6% 0.133 27.917))",
                content: "light-dark(oklch(43.8% 0.168 29.456), oklch(76.8% 0.164 28.112))",
                backgroud: "light-dark(oklch(97.4% 0.017 28.921), color-mix(in oklab, oklch(38.2% 0.155 29.233) 20%, transparent))",
                border: "light-dark(oklch(89.6% 0.072 28.841), oklch(43.8% 0.168 29.456))"
            }
        case "yellow":
            return {
                title: "light-dark(oklch(42.6% 0.123 96.512), oklch(87.8% 0.134 96.214))",
                content: "light-dark(oklch(47.9% 0.148 97.021), oklch(72.1% 0.062 96.887))",
                backgroud: "light-dark(oklch(97.8% 0.025 96.443), color-mix(in oklab, oklch(42.6% 0.123 96.512) 22%, transparent))",
                border: "light-dark(oklch(91.2% 0.082 96.103), oklch(47.9% 0.148 97.021))"
            }
        default:
            return {
                title: "light-dark(oklch(37.8% 0.077 168.94), oklch(84.5% 0.143 164.978))",
                content: "light-dark(oklch(43.2% 0.095 166.913), oklch(76.5% 0.177 163.223))",
                backgroud: "light-dark(oklch(97.9% 0.021 166.113) ,color-mix(in oklab, oklch(37.8% 0.077 168.94) 20%, transparent))",
                border: "light-dark(oklch(90.5% 0.093 164.15),oklch(90.5% 0.093 164.15))"
            }
    }
}

export const Alert = ({
    color = "green",
    title,
    content
}: Props) => {
    return (
        <Card
            withBorder
            radius={15}
            p="lg"
            style={{ backgroundColor: `${AlertColor(color).backgroud}`, borderColor: `${AlertColor(color).border}` }}
        >
            <Text fw={600} fz="lg" mb="sm" c={AlertColor(color).title}>
                {title}
            </Text>
            <Text fz="sm" c={AlertColor(color).content}>
                {content}
            </Text>
        </Card>
    )
}