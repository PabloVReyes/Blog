import { ColorInput } from "@mantine/core"
import { colors } from "./colors"

interface Props {
    form: any
}

export const ColorSelect = ({ form }: Props) => {
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