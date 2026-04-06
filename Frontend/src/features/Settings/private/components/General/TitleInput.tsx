import { Divider, Text, TextInput } from "@mantine/core"
import { useSettingStore } from "../../store";

const MAX_LENGTH = 15;

export const TitleInput = () => {
    const { setTitle, title, subtitle, setSubtitle } = useSettingStore()

    return (
        <div>
            <TextInput
                label="Título"
                withAsterisk
                autoFocus
                placeholder="Título de la página"
                description="Título principal de la pagina"
                value={title}
                maxLength={MAX_LENGTH}
                onChange={(e) => setTitle(e.currentTarget.value)}
                rightSection={
                    <Text size="xs" c="dimmed">
                        {title.length}/{MAX_LENGTH}
                    </Text>
                }
                rightSectionWidth={40}
            />
            <Divider />
            <TextInput
                label="Subtítulo"
                withAsterisk
                autoFocus
                placeholder="Subtítulo de la página"
                description="Subtítulo de la página"
                value={subtitle}
                maxLength={MAX_LENGTH}
                onChange={(e) => setSubtitle(e.currentTarget.value)}
                rightSection={
                    <Text size="xs" c="dimmed">
                        {subtitle.length}/{MAX_LENGTH}
                    </Text>
                }
                rightSectionWidth={40}
            />
        </div>
    )
}