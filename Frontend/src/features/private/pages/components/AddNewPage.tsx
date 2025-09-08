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
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import { TableKit } from '@tiptap/extension-table'
import Text from '@tiptap/extension-text'
import { Gapcursor } from '@tiptap/extensions'
import "./styles.css"
import { IconColumnInsertLeft, IconColumnInsertRight, IconColumnRemove, IconRowInsertBottom, IconRowInsertTop, IconRowRemove, IconTableOff, IconTablePlus } from "@tabler/icons-react";
import { usePageStore } from "@/store/pagesStore";

export const AddNewPageHeader = () => {
    const publishPage = usePageStore((s) => s.publishPage);
    const isPublishing = usePageStore((s) => s.isPublishing);

    const handlePublish = async () => {
        const result = await publishPage();
        if (result.ok) {
            console.log("✅ Publicado", result.data);
            // aquí puedes cerrar modal, redirigir, etc.
        } else {
            console.error("❌ Error al publicar:", result.error);
        }
    };

    return (
        <ModalHeader className="modal-header">
            <Button onClick={handlePublish} loading={isPublishing}>
                Publicar
            </Button>
            <ModalCloseButton />
        </ModalHeader>
    )
}

export const AddNewPage = () => {
    const { setTitle, setContent } = usePageStore();

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
            setContent(editor.getJSON(), editor.getHTML());
        },
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
                        onChange={e => setTitle(e.target.value)}
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
                                    <IconTablePlus size={18} stroke={1.5} color="gray" />
                                </RichTextEditor.Control>

                                <RichTextEditor.Control onClick={() => editor.chain().focus().addColumnBefore().run()}>
                                    <IconColumnInsertLeft size={18} stroke={1.5} color="gray" />
                                </RichTextEditor.Control>
                                <RichTextEditor.Control onClick={() => editor.chain().focus().addColumnAfter().run()}>
                                    <IconColumnInsertRight size={18} stroke={1.5} color="gray" />
                                </RichTextEditor.Control>
                                <RichTextEditor.Control onClick={() => editor.chain().focus().addRowBefore().run()}>
                                    <IconRowInsertTop size={18} stroke={1.5} color="gray" />
                                </RichTextEditor.Control>
                                <RichTextEditor.Control onClick={() => editor.chain().focus().addRowAfter().run()}>
                                    <IconRowInsertBottom size={18} stroke={1.5} color="gray" />
                                </RichTextEditor.Control>
                                <RichTextEditor.Control onClick={() => editor.chain().focus().deleteRow().run()}>
                                    <IconRowRemove size={18} stroke={1.5} color="gray" />
                                </RichTextEditor.Control>
                                <RichTextEditor.Control onClick={() => editor.chain().focus().deleteColumn().run()}>
                                    <IconColumnRemove size={18} stroke={1.5} color="gray" />
                                </RichTextEditor.Control>
                                <RichTextEditor.Control onClick={() => editor.chain().focus().deleteTable().run()}>
                                    <IconTableOff size={18} stroke={1.5} color="gray" />
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