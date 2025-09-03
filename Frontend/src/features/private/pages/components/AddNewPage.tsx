import { Button, Container, ModalCloseButton, ModalHeader, Stack, TextInput } from "@mantine/core"
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import { StarterKit } from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import { Color } from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import { TableKit } from '@tiptap/extension-table'
import Text from '@tiptap/extension-text'
import { Gapcursor } from '@tiptap/extensions'
import "./styles.css"

export const AddNewPageHeader = () => {
    return (
        <ModalHeader className="modal-header">
            <Button>
                Publicar
            </Button>
            <ModalCloseButton />
        </ModalHeader>
    )
}

export const AddNewPage = () => {
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
            Color,
            TableKit.configure({
                table: { resizable: true },
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Contenido' })
        ],
    });

    return (
        <>
            <Container>
                <Stack>
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
                    />

                    <RichTextEditor editor={editor}>
                        <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
                                <RichTextEditor.Code />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.Hr />
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                                <RichTextEditor.Subscript />
                                <RichTextEditor.Superscript />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignJustify />
                                <RichTextEditor.AlignRight />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Undo />
                                <RichTextEditor.Redo />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ColorPicker
                                colors={[
                                    '#25262b',
                                    '#868e96',
                                    '#fa5252',
                                    '#e64980',
                                    '#be4bdb',
                                    '#7950f2',
                                    '#4c6ef5',
                                    '#228be6',
                                    '#15aabf',
                                    '#12b886',
                                    '#40c057',
                                    '#82c91e',
                                    '#fab005',
                                    '#fd7e14',
                                ]}
                            />

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Control
                                    onClick={() =>
                                        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                                    }
                                >
                                    Tabla 3x3
                                </RichTextEditor.Control>

                                <RichTextEditor.Control onClick={() => editor.chain().focus().addColumnBefore().run()}>
                                    + Columna antes
                                </RichTextEditor.Control>
                                <RichTextEditor.Control onClick={() => editor.chain().focus().addColumnAfter().run()}>
                                    + Columna después
                                </RichTextEditor.Control>
                                <RichTextEditor.Control onClick={() => editor.chain().focus().addRowBefore().run()}>
                                    + Fila arriba
                                </RichTextEditor.Control>
                                <RichTextEditor.Control onClick={() => editor.chain().focus().addRowAfter().run()}>
                                    + Fila abajo
                                </RichTextEditor.Control>
                                <RichTextEditor.Control onClick={() => editor.chain().focus().deleteRow().run()}>
                                    Eliminar fila
                                </RichTextEditor.Control>
                                <RichTextEditor.Control onClick={() => editor.chain().focus().deleteTable().run()}>
                                    Eliminar tabla
                                </RichTextEditor.Control>
                            </RichTextEditor.ControlsGroup>
                        </RichTextEditor.Toolbar>

                        <RichTextEditor.Content />
                    </RichTextEditor>
                </Stack>
            </Container>
        </>
    )
}