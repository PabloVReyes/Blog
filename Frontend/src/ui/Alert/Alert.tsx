import { Card, Text } from "@mantine/core";
import React, { type ReactNode, type ReactElement, type CSSProperties } from "react";

interface Props {
    color?: string;
    title?: string | ReactNode;
    content: string | ReactNode;
}

const AlertColor = (color: string) => ({
    title: `light-dark(var(--color-${color}-900), var(--color-${color}-300))`,
    content: `light-dark(var(--color-${color}-800), var(--color-${color}-300))`,
    background: `light-dark(var(--color-${color}-50), color-mix(in oklab, var(--color-${color}-900) 20%, transparent))`,
    border: `light-dark(var(--color-${color}-200), var(--color-${color}-800))`
});

export const Alert = ({
    color = "emerald",
    title,
    content,
}: Props) => {
    const colors = AlertColor(color);

    const renderNode = (
        value: string | ReactNode,
        textColor: string,
        extra?: Record<string, any>
    ) => {
        // Texto plano
        if (typeof value === "string" || typeof value === "number") {
            return (
                <Text {...extra} style={{ color: textColor }}>
                    {value}
                </Text>
            );
        }

        // ReactElement tipado correctamente
        if (React.isValidElement(value)) {
            const element = value as ReactElement<any>;

            return React.cloneElement(element, {
                style: {
                    ...(element.props?.style as CSSProperties),
                    color: textColor,
                },
            });
        }

        return value;
    };

    return (
        <Card
            withBorder
            p="lg"
            style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
                justifyContent: "center"
            }}
        >
            {title &&
                renderNode(title, colors.title, {
                    fw: 600,
                    fz: "lg",
                    mb: 4,
                })}

            {renderNode(content, colors.content, {
                fz: "sm",
            })}
        </Card>
    );
};