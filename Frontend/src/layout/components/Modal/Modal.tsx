import { useModalStore } from "@/layout/store";
import { Box, Group, Modal as ModalMantine, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { getTablerIcon } from "@/helpers";
import { ThemeIcon } from "@/components";

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
    const color = modal?.color ?? primaryColor

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
                bg={color}
                c={"white"}
                style={{
                    padding: "16px 20px"
                }}
            >
                <Group justify="space-between" w="100%" wrap="nowrap">
                    <Group gap="sm" wrap="nowrap">
                        <ThemeIcon
                            size={40}
                            radius={10}
                            variant="light"
                            color={color}
                        >
                            <Icon size={20}/>
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
                        radius={10}
                        size={30}
                        style={{ cursor: "pointer" }}
                        onClick={closeModal}
                        color={color}
                    >
                        <IconX size={18}/>
                    </ThemeIcon>
                </Group>
            </Box>

            <Stack p={"md"} gap={"lg"}>
                {modal?.content}
            </Stack>
        </ModalMantine>
    );
};