import { Text, TextInput } from "@mantine/core"

const MAX_LENGTH = 50;

export const TitleInput = ({ form }: { form: any }) => {
    return (
        <TextInput
            label="Título"
            withAsterisk
            description="Título de la página"
            placeholder="Título"
            maxLength={MAX_LENGTH}
            rightSection={
                <Text size="xs" c="dimmed">
                    {form.values.title.length}/{MAX_LENGTH}
                </Text>
            }
            key={form.key('title')}
            {...form.getInputProps("title")}
            rightSectionWidth={40}
        />
    )
} 