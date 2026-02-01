import { Autocomplete, Group, Text } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';

interface IconOption {
    value: string;
    label: string;
}

interface Props {
    form: any; // formulario de Mantine
}

export const IconSelect = ({ form }: Props) => {
    const iconNames = Object.keys(TablerIcons)
        .filter((name) => name.startsWith('Icon'))
        .sort();

    const data: IconOption[] = iconNames.map((name) => ({
        value: name,
        label: name,
    }));

    const iconProps = form.getInputProps('icon');

    // Icono a mostrar a la izquierda del input según el valor del formulario
    const SelectedIcon: any = iconProps.value ? (TablerIcons as any)[iconProps.value] : null;

    return (
        <Autocomplete
            withAsterisk
            label="Icono"
            description="Icono que aparecerá en el menú lateral"
            placeholder="Escribe nombre del icono..."
            data={data.map((i) => i.label)}
            value={iconProps.value} // valor del formulario
            onChange={(val) => iconProps.onChange(val)}
            limit={10}
            maxDropdownHeight={200}
            leftSection={SelectedIcon ? <SelectedIcon size={20} stroke={1.5} /> : null}
            renderOption={({ option }: any) => {
                const ItemIcon: any = (TablerIcons as any)[option.value];
                return (
                    <Group gap="xs">
                        {ItemIcon && <ItemIcon size={18} stroke={1.5} />}
                        <Text size='sm'>{option.label}</Text>
                    </Group>
                );
            }}
            {...iconProps} // aplica validaciones y errores del formulario
        />
    );
};
