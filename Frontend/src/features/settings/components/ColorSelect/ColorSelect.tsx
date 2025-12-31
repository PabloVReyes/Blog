import { colorMap } from "@/utils/colors"
import { CheckIcon, ColorSwatch, Group, Text } from "@mantine/core"
import { useSettingStore } from "../../store"

export const ColorSelect = () => {
    const { color, setColor } = useSettingStore()
    return (
        <>
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
                        {color === name && <CheckIcon size={12} />}
                    </ColorSwatch>
                ))}
            </Group>
        </>
    )
}