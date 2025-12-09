import { Card, Image, Text } from "@mantine/core"
import type { CmpCardProps } from "./type"

export const CmpCard = ({ height, title, content, image, url }: CmpCardProps) => {
    return (
        <Card
            component={url ? "a" : "div"}
            href={url ? url! : undefined}
            target={url ? "_blank" : undefined}
            display="flex"
            style={{
                flexDirection: "column",
                height: height ?? "100%",
            }}
        >
            {/* TÍTULO */}
            <Card.Section
                withBorder
                inheritPadding
                py="xs"
                style={{ textAlign: "center" }}
            >
                <Text fw={700}>{title}</Text>
            </Card.Section>

            {/* CONTENIDO CENTRADO */}
            {content &&
                <Card.Section
                    inheritPadding
                    py="xs"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        flex: image ? 0 : 1,
                    }}
                >
                    <Text>{content}</Text>
                </Card.Section>
            }

            {/* IMAGEN CENTRADA */}
            {image && (
                <Card.Section
                    pb={10}
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                    }}
                >
                    <Image
                        src={image}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                        }}
                    />
                </Card.Section>
            )}
        </Card>
    )
}
