import { ColorInput } from "@mantine/core"
import { colors } from "../../utils/colors"
import { type UseFormReturnType } from "@mantine/form";

interface BaseForm {
    color: string;
}

interface Props<T extends BaseForm> {
    form?: UseFormReturnType<T>;
}

export const ColorSelect = <T extends BaseForm>({
    form,
}: Props<T>) => {
    return (
        <ColorInput
            style={{ flex: '1 1 auto' }}
            withAsterisk
            label="Color"
            description="Color del icono"
            placeholder="Ej. Red"
            swatches={colors}
            withPicker={false}
            {...form?.getInputProps("color")}
        />
    );
};

// 28 lineas