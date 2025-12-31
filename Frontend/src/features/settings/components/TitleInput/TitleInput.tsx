import { Text, TextInput } from "@mantine/core"
import { useSettingStore } from "../../store"

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
            maxLength={15}
            onChange={(e) => setTitle(e.currentTarget.value)}
            rightSection={
                <Text size="xs" c="dimmed">
                    {title.length}/15
                </Text>
            }
            rightSectionWidth={40}
        />
    )
}