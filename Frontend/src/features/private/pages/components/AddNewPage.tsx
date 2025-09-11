import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import { StarterKit } from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import { TableKit } from '@tiptap/extension-table'
import Text from '@tiptap/extension-text'
import { Gapcursor } from '@tiptap/extensions'
import "./styles.css"
import { useForm } from '@mantine/form';

import { AppShell, Button, Modal, TextInput, Title } from "@mantine/core"
import { RichTextEditorToolBar } from './RichTextEditor';
import { publishPage } from '@/api/pages';
import { notify } from '@/utils/notify';

interface Props {
    opened: boolean;
    close: () => void;
    onUpdate?: () => void;
}

export const AddNewPage = ({ opened, close, onUpdate }: Props) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            contentHtml: '',
            contentJson: {}
        },

        validate: {
            title: (value) => (value.trim().length === 0 ? 'El título es obligatorio' : null),
            contentHtml: (value) => (value.trim().length === 0 ? 'El contenido es obligatorio' : null)
        }
    })

    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Gapcursor,
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextStyle,
            Color,
            TableKit.configure({
                table: { resizable: true },
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Contenido' })
        ],
        onUpdate: ({ editor }) => {
            form.setFieldValue('contentHtml', editor.getHTML());
            form.setFieldValue('contentJson', editor.getJSON());
        },
    });


    const handleSubmit = async (values: typeof form.values) => {
        try {
            await publishPage(values.title, values.contentJson, values.contentHtml)
            
            notify({
                type: "success",
                title: "Página creada",
                message: "Página creada con exito"
            })

            onUpdate?.()

        }
        catch (error: any) {
            notify({
                type: "error",
                title: "Error ",
                message: error.message
            })
        }
        finally {
            close()
        }
    }

    return (
        <Modal.Root
            opened={opened}
            onClose={close}
            fullScreen
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Modal.Overlay />
                <Modal.Content>

                    <AppShell
                        padding="md"
                        header={{ height: 60 }}
                        navbar={{
                            width: 300,
                            breakpoint: 'sm',
                        }}
                        style={{ height: '100%' }}
                    >
                        <AppShell.Header
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: '60px' }}
                        >
                            <Button
                                type="submit"
                            >
                                Publicar
                            </Button>
                            <Title order={4} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Nueva página</Title>
                            <Modal.CloseButton />
                        </AppShell.Header>

                        <AppShell.Navbar>
                            <RichTextEditorToolBar
                                editor={editor}
                            />
                        </AppShell.Navbar>

                        <AppShell.Main style={{ overflowY: 'auto', maxHeight: '100%' }}>

                            <TextInput
                                placeholder="Agregar Titulo"
                                styles={{
                                    input: {
                                        border: "none",
                                        boxShadow: "none",
                                        fontSize: "50px",
                                        height: "60px",
                                        "::placeholder": {
                                            fontSize: "20px",
                                            color: "#999"
                                        },
                                        background: "transparent"
                                    }
                                }}
                                key={form.key('title')}
                                {...form.getInputProps('title')}
                            />


                            <RichTextEditor editor={editor}>
                                <RichTextEditor.Content
                                    style={{
                                        outline: 'none',
                                        border: 'none',
                                        boxShadow: 'none',
                                    }}
                                />
                                {form.errors.contentHtml && (
                                    <div style={{ color: 'rgb(224, 49, 49)', fontSize: '12px' }}>
                                        {form.errors.contentHtml}
                                    </div>
                                )}
                            </RichTextEditor>


                        </AppShell.Main>
                    </AppShell>
                </Modal.Content>
            </form>
        </Modal.Root>
    )
}