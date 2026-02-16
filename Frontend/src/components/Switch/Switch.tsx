import { Group, Text, Switch as MantineSwitch, Stack } from "@mantine/core"
import { IconCheck, IconX } from "@tabler/icons-react"

interface Props {
    value?: boolean;
    label?: string;
    description?: string;
    withAsterisk?: boolean;
}

export const Switch = ({ value, label, description, withAsterisk, ...props }: Props) => {
    return (
        <Group justify="space-between" wrap="nowrap" gap="xl">
            <Stack gap={2}>
                {label &&
                    <Group gap={2} wrap="nowrap">
                        <Text size="sm" c={"light-dark(black, white)"}>Visible</Text>
                        {withAsterisk && <Text size="xs" style={{ color: 'red' }}>*</Text>}
                    </Group>
                }
                {description && <Text size="xs" c="light-dark(#6b7280, #9ca3af)">{description}</Text>}
            </Stack>
            <MantineSwitch
                size="md"
                {...props}
                thumbIcon={
                    value ? (
                        <IconCheck
                            size={12}
                            color="light-dark(var(--mantine-primary-color-6), var(--mantine-primary-color-8))"
                            stroke={3}
                        />
                    ) : (
                        <IconX size={12} color="red" stroke={3} />
                    )
                }
            />
        </Group>
    )
}