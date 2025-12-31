import { AppShell, Button, Modal, TextInput, Title } from "@mantine/core"
import { Editor } from "./editor"
import "./styles.css"
import { useForm } from "@mantine/form"
import type { OutputData } from '@editorjs/editorjs';
import { publishPage } from "@/api/pages";

export const CmpPageAdd = ({ opened, close }: any) => {
    const form = useForm<{
        title: string;
        content: OutputData | null;
    }>({
        initialValues: {
            title: '',
            content: null,
        },
        validate: {
            title: (value) => (value.length < 5 ? 'El título es muy corto' : null),
            content: (value) => (!value || value.blocks.length === 0 ? 'El contenido no puede estar vacío' : null),
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            await publishPage(values)
        } catch (error: any) {
            console.error('Error submitting page:', error);
        } finally {
            close()
        }
    }

    return (
        <Modal.Root
            opened={opened}
            onClose={close}
            fullScreen
            radius={0}
            transitionProps={{ transition: 'fade', duration: 200 }}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Modal.Overlay />
                <Modal.Content>
                    <AppShell
                        padding="md"
                        header={{ height: 60 }}
                        style={{ height: '100%' }}
                    >
                        <AppShell.Header
                            px="md"
                            h={60}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button
                                type="submit"
                            >
                                Publicar
                            </Button>
                            <Title order={4} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Nueva página</Title>
                            <Modal.CloseButton />
                        </AppShell.Header>
                        <AppShell.Main className="editor-page">
                            <div className="editor-sheet">
                                <TextInput
                                    autoFocus
                                    placeholder="Título de la página"
                                    variant="unstyled"
                                    size="xl"
                                    styles={{
                                        input: {
                                            fontSize: '32px',
                                            fontWeight: 600,
                                            lineHeight: 1.2,

                                            padding: '8px 4px',

                                            '::placeholder': {
                                                color: 'light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-3))',
                                                fontWeight: 500,
                                            },
                                        },
                                    }}
                                    {...form.getInputProps('title')}
                                />
                                <Editor 
                                    data={form.values.content ?? undefined}
                                    onChange={(data) => form.setFieldValue('content', data)}
                                />
                            </div>
                        </AppShell.Main>
                    </AppShell>
                </Modal.Content>
            </form>
        </Modal.Root>
    )
}