import { ColorInput, ColorSwatch, Group, Stack, Text } from "@mantine/core"
import { colorMap, colors } from "../../utils/colors"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"

interface Props {
    type: "settings" | "default"
    form?: any
    useStore?: any
}

export const ColorSelect = ({
    form,
    type = "default",
    useStore
}: Props) => {
    const { color, setColor } = useStore ? useStore() : useState()
    return (
        <>
            {type === "default" &&
                <ColorInput
                    style={{ flex: '1 1 auto' }}
                    withAsterisk
                    label="Color"
                    description="Color del icono"
                    placeholder="Ej. Red"
                    swatches={colors}
                    withPicker={false}
                    {...form.getInputProps("color")}
                />
            }
            {type === "settings" &&
                <Stack gap={0}>
                    <Text size="sm">
                        Color principal <Text span style={{ color: "red" }}>*</Text>
                    </Text>
                    <Text c="dimmed" size="xs">Paleta de colores</Text>
                    <Group gap={5} style={{ overflowX: "auto" }}>
                        {Object.entries(colorMap).map(([name, hex]) => (
                            <ColorSwatch
                                key={name}
                                color={hex}
                                size={40}
                                onClick={() => setColor(name)}
                                style={{
                                    cursor: "pointer",
                                    color: '#fff'
                                }}
                            >
                                {color === name && <IconCheck size={25} />}
                            </ColorSwatch>
                        ))}
                    </Group>
                </Stack>
            }
        </>
    )
}