import { Text, TextInput } from "@mantine/core"
import { useSettingStore } from "../store";

const MAX_LENGTH = 15;

export const TitleInput = () => {
    const { setTitle, title } = useSettingStore()

    return (
        <TextInput
            label="Título"
            withAsterisk
            autoFocus
            placeholder="Título de la página"
            description="Título principal de la pagina"
            defaultValue={title}
            maxLength={MAX_LENGTH}
            onChange={(e) => setTitle(e.currentTarget.value)}
            rightSection={
                <Text size="xs" c="dimmed">
                    {title.length}/{MAX_LENGTH}
                </Text>
            }
            rightSectionWidth={40}
        />
    )
}