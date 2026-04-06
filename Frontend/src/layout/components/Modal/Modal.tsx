import { useModalStore } from "@/layout/store";
import { Box, Group, Modal as ModalMantine, Stack, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { getTablerIcon } from "@/helpers";

export const Modal = () => {
    const { primaryColor } = useMantineTheme()

    const { opened, closeModal, modal } = useModalStore();

    useEffect(() => {

        if (!opened || !modal?.autoClose) return;

        const timer = setTimeout(() => {
            closeModal();
        }, modal.autoClose);

        return () => clearTimeout(timer);

    }, [opened, modal?.autoClose, closeModal]);

    const Icon = getTablerIcon(modal?.icon)

    return (
        <ModalMantine
            opened={opened}
            onClose={closeModal}
            centered
            size="lg"
            padding={0}
            withCloseButton={false}
            transitionProps={{ transition: "fade", duration: 200 }}
            closeOnEscape={modal?.closeOnEscape ?? true}
            closeOnClickOutside={modal?.closeOnClickOutside ?? true}
        >
            <Box
                bg={modal?.color ?? primaryColor}
                c={"white"}
                style={{
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    padding: "16px 20px"
                }}
            >
                <Group justify="space-between" w="100%" wrap="nowrap">
                    <Group gap="sm" wrap="nowrap">
                        <ThemeIcon
                            size={36}
                            radius="md"
                            variant="light"
                            color={"var(--mantine-primary-color-contrast)"}
                        >
                            <Icon size={20} />
                        </ThemeIcon>

                        <Stack gap={0}>
                            <Title order={4} c={"var(--mantine-primary-color-contrast)"}>{modal?.title}</Title>

                            {modal?.subtitle && (
                                <Text size="sm" c="var(--mantine-primary-color-contrast)">
                                    {modal.subtitle}
                                </Text>
                            )}
                        </Stack>
                    </Group>

                    <ThemeIcon
                        variant="light"
                        color="var(--mantine-primary-color-contrast)"
                        radius={"md"}
                        style={{ cursor: "pointer" }}
                        onClick={closeModal}
                    >
                        <IconX size={18} />
                    </ThemeIcon>
                </Group>
            </Box>

            <Stack p={"md"} gap={"lg"}>
                {modal?.content}
            </Stack>
        </ModalMantine>
    );
};