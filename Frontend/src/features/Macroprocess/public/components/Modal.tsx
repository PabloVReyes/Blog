import { Box, Group, Loader, Modal as MantineModal, SimpleGrid, Stack, Text, ThemeIcon, Title, UnstyledButton } from "@mantine/core"
import { IconClipboardList, IconFileText, IconUsers, IconX } from "@tabler/icons-react";
import styles from "./Modal.module.css"
import type { Area } from "../../types/areas.types";
import { useDownloadFile } from "@/hooks";
import { Alert } from "@/components";

interface Props {
    opened: boolean
    onClose: () => void;
    area?: Area | null
    loading: boolean | undefined;
    color: string
}

export const Modal = ({ opened, onClose, area, color, loading }: Props) => {
    const { download } = useDownloadFile()
    return (
        <MantineModal
            opened={opened}
            onClose={onClose}
            centered
            size={"lg"}
            padding={0}
            withCloseButton={false}
        >
            {loading || !area ?
                (<Loader />)
                : (
                    <>
                        <Box
                            bg={color}
                            c={"white"}
                            p={"xl"}
                            style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
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
                                    <SimpleGrid cols={{ sm: 1, md: 2 }}>
                                        {area?.manuals.map((manual) => (
                                            <UnstyledButton
                                                key={manual.id}
                                                p={"sm"}
                                                disabled={!manual.fileId}
                                                className={styles.button}
                                                onClick={() => download(manual.fileId ?? "")}
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
                                color="emerald"
                                content={
                                    <Text size="sm">
                                        <Text fw={700} span size="sm">Información: </Text>Para documentación específica, manuales
                                        de procedimientos, formatos o contacto directo con esta área,
                                        consulta al responsable del área.
                                    </Text>
                                }
                            />
                        </Stack>
                    </>
                )}
        </MantineModal>
    )
}