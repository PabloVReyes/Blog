import { deleteCarousel } from "@/api/carousel"
import { useModalStore } from "@/store/modalStore"
import { usePrivateHomeCarouselStore } from "@/store/pages/homeStore"
import { Alert, Button, Divider, Flex, Group, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconTrash } from "@tabler/icons-react"
import { useState } from "react"

export const CmpHomeCarouselEliminate = ({ id, title }: { id: string, title: string }) => {
    const { closeModal, openModal } = useModalStore()
    const { fetchCarousel } = usePrivateHomeCarouselStore()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm({
        initialValues: {
            id: id,
            value: ""
        },
        validate: {
            value: (value => value == `Eliminar ${title}` ? null : "Para eliminar el item escribe exactamente lo que se solicita")
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setIsLoading(true);

            await deleteCarousel(values.id)

            setTimeout(() => {
                openModal({
                    title: "Item eliminado",
                    subtitle: "El item fue eliminado correctamente",
                    content: (
                        <Stack align="center" p="xl">
                            <IconTrash size={60} color="red" />
                            <Text ta="center">
                                El item ha sido eliminado correctamente.
                            </Text>
                        </Stack>
                    )
                });

                fetchCarousel();

                setTimeout(() => {
                    closeModal();
                }, 2500);

            }, 1000);
        } catch (error) {
            console.error("Error deleted permission:", error);
        } finally {
            setTimeout(() => setIsLoading(false), 1000);
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Alert color="yellow" variant="light" icon={<IconAlertTriangleFilled />}>
                    <Text size="sm" fw={700}>
                        ¡Antes de continuar....!
                    </Text>
                </Alert>

                <Flex
                    gap="md"
                    style={{
                        borderLeft: "3px solid #ffcc00",
                        paddingLeft: 12
                    }}
                >
                    <Stack>
                        <Text size="sm">
                            Estás a punto de eliminar del carousel el item “{title}”.
                        </Text>

                        <Text size="sm">
                            Esta acción es <b>permanente e irreversible</b>. Una vez eliminado, no podrás recuperar este item.
                        </Text>
                        <Text size="sm">
                            Para continuar, escribe exactamente:
                        </Text>

                        <Text size="sm" fw={700}>
                            Eliminar {title}
                        </Text>

                        <Text size="sm">
                            Esto garantiza que comprendes el impacto de esta acción.
                        </Text>
                    </Stack>
                </Flex>

                <Divider />

                <TextInput
                    autoFocus
                    withAsterisk
                    placeholder="Eliminar permiso"
                    {...form.getInputProps("value")}
                />

                <Group gap={5} justify="flex-end">
                    <Button variant="outline" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button
                        color="red"
                        type="submit"
                        loading={isLoading}
                    >
                        Eliminar
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}