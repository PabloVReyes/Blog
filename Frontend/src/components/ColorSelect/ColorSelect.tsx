import { ColorInput } from "@mantine/core"
import { colors } from "../../utils/colors"

interface Props {
    type: "settings" | "default"
    form?: any
    useStore?: any
}

export const ColorSelect = ({
    form,
}: Props) => {
    return (
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
    )
}