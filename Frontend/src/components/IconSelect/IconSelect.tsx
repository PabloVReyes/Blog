import { Autocomplete, Group, Text, type ComboboxStringItem } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';
import { type UseFormReturnType } from '@mantine/form';
import styles from "./IconSelect.module.css";

type TablerIconName = keyof typeof TablerIcons;
type TablerIconComponent = React.FC<TablerIcons.IconProps>;

interface IconFormBase {
    icon: string;
}

interface Props<T extends IconFormBase> {
    form: UseFormReturnType<T>;
}

export const IconSelect = <T extends IconFormBase>({ form }: Props<T>) => {
    const iconNames = (Object.keys(TablerIcons) as TablerIconName[])
        .filter((name) => name.startsWith('Icon'))
        .sort();

    const iconProps = form.getInputProps('icon');

    const SelectedIcon = (
        iconProps.value && iconProps.value in TablerIcons
            ? TablerIcons[iconProps.value as TablerIconName]
            : null
    ) as TablerIconComponent | null;

    return (
        <Autocomplete
            classNames={{ option: styles.option }}
            withAsterisk
            label="Icono"
            description="Icono que representa al elemento"
            placeholder="Escribe nombre del icono..."
            data={iconNames}
            limit={10}
            maxDropdownHeight={200}
            leftSection={SelectedIcon ? <SelectedIcon size={20} stroke={1.5} /> : null}
            renderOption={({ option }: { option: ComboboxStringItem }) => {
                const IconName = option.value as TablerIconName;
                const ItemIcon = TablerIcons[IconName] as TablerIconComponent;

                return (
                    <Group gap="xs">
                        {ItemIcon && <ItemIcon size={18} stroke={1.5} />}
                        <Text size='sm'>{option.value}</Text>
                    </Group>
                );
            }}
            {...iconProps}
        />
    );
};