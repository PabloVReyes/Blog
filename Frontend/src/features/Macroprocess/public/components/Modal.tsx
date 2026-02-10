import { Box, Group, Loader, Modal as MantineModal, SimpleGrid, Stack, Text, ThemeIcon, Title, UnstyledButton } from "@mantine/core"
import { IconClipboardList, IconFileText, IconUsers, IconX } from "@tabler/icons-react";
import styles from "./Modal.module.css"
import { Alert } from "@/ui";
import { downloadManual } from "../api";

interface Props {
    opened: boolean
    onClose: () => void;
    area?: any
    loading: boolean | undefined;
    color: string
}

export const Modal = ({ opened, onClose, area, color, loading }: Props) => {
    const download = async (id: string) => {

        try {
            const response = await downloadManual(id)
            const disposition = response.headers["content-disposition"];
            const fileName =
                disposition?.split("filename=")[1]?.replace(/"/g, "") ||
                "manual.pdf";
            const blob = new Blob([response.data], {
                type: response.headers["content-type"]
            });

            const link = document.createElement("a");

            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(link.href);

        } catch (error) {
            console.error("Error al descargar archivo", error);
        }
    };

    return (
        <MantineModal
            opened={opened}
            onClose={onClose}
            centered
            size={"lg"}
            padding={0}
            withCloseButton={false}
            radius={16}
        >
            {loading || !area ?
                (<Loader />)
                : (
                    <>
                        <Box
                            bg={color}
                            c={"white"}
                            p={"xl"}
                            style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                        >
                            <Group justify="space-between" align="flex-start" mb={"md"} wrap="nowrap">
                                <Box>
                                    <Title order={2}>
                                        {area?.name}
                                    </Title>

                                    <Group gap={2} mt={6}>
                                        <IconUsers size={16} />
                                        <Text>{area?.manager}</Text>
                                    </Group>
                                </Box>

                                <ThemeIcon
                                    variant="light"
                                    color="white"
                                    radius={"md"}
                                    style={{ cursor: "pointer" }}
                                    onClick={onClose}
                                >
                                    <IconX size={18} />
                                </ThemeIcon>
                            </Group>

                            {area?.description &&
                                <Text size="sm" c={"white"}>
                                    {area?.description}
                                </Text>
                            }
                        </Box>

                        <Stack p={"xl"} gap={"lg"}>
                            <Box>
                                <Group mb={"sm"}>
                                    <IconClipboardList size={20} />
                                    <Title order={4}>Manuales y documentos</Title>
                                </Group>
                                {area?.manuals &&
                                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                                        {area?.manuals.map((manual: any, index: number) => (
                                            <UnstyledButton
                                                key={index}
                                                p={"sm"}
                                                disabled={!manual.storedName}
                                                className={styles.button}
                                                onClick={() => download(manual.id)}
                                            >
                                                <Group gap={5} wrap="nowrap">
                                                    <IconFileText size={14} />
                                                    <Text size="sm">
                                                        {manual.manualType.name}
                                                    </Text>
                                                </Group>
                                            </UnstyledButton>
                                        ))}
                                    </SimpleGrid>
                                }
                            </Box>

                            <Alert
                                color="green"
                                title="Información"
                                content="Para documentación específica, manuales
            de procedimientos, formatos o contacto directo con esta área,
            consulta al responsable del área."
                            />
                        </Stack>
                    </>
                )}
        </MantineModal>
    )
}