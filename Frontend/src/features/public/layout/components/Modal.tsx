import { useModalStore } from "@/store/modalStore"
import { Modal as ModalMantine, Stack, Text } from "@mantine/core"

export const Modal = () => {
    const { opened, closeModal, modal } = useModalStore()
    return (
        <ModalMantine.Root
            opened={opened}
            onClose={closeModal}
            centered
            size={modal?.size}
            fullScreen={modal?.size ? false : true}
        >
            <ModalMantine.Overlay />
            <ModalMantine.Content>
                {modal?.header ?
                    <>{modal.header}</>
                    : <ModalMantine.Header>
                        <ModalMantine.Title style={{ width: "100%", textAlign: "center" }}>
                            {modal?.title}
                            {modal?.subtitle && (
                                <Text size="sm" c="dimmed">
                                    {modal.subtitle}
                                </Text>
                            )}
                        </ModalMantine.Title>
                        <ModalMantine.CloseButton />
                    </ModalMantine.Header>
                }
                <ModalMantine.Body>
                    <Stack>{modal?.content}</Stack>
                </ModalMantine.Body>
            </ModalMantine.Content>
        </ModalMantine.Root>
    )
}