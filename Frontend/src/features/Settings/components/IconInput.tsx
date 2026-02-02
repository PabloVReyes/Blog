import { Card, FileInput, Group, Image, Text } from "@mantine/core"
import { useState, type Dispatch, type SetStateAction } from "react";
import { useSettingStore } from "../store";

interface Props {
    setIcon: Dispatch<SetStateAction<File | null>>;
}

export const IconInput = ({ setIcon }: Props) => {
    const { favicon } = useSettingStore();
    const [preview, setPreview] = useState<string | null>(null);

    const handleIconChange = (file: File | null) => {
        setIcon(file)

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file)
        } else {
            setPreview(null)
        }
    }

    return (
        <Group justify="space-between" align="center" mt="sm">
            <FileInput
                label="Icono"
                description="Icono de la pagina"
                withAsterisk
                accept="image/png,image/x-icon"
                placeholder="Da clic para seleccionar el icono"
                onChange={handleIconChange}
                style={{ flex: 1 }}
            />
            <Card>
                {preview ? (
                    <Image
                        src={preview}
                        alt="Icono"
                        w={80}
                        h="auto"
                        radius="sm"
                    />
                ) : favicon ? (
                    <Image
                        src={`${import.meta.env.VITE_API_URL}${favicon}`}
                        alt="Icono"
                        w={80}
                        h="auto"
                        radius="sm"
                    />
                ) : (
                    <Text size="sm" c="dimmed">
                        Sin icono
                    </Text>
                )}
            </Card>
        </Group>
    )
}