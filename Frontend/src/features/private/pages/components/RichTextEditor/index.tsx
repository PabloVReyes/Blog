import { Group, Stack, Text } from "@mantine/core"
import { RichTextEditor } from "@mantine/tiptap"
import { IconAlignCenter, IconAlignJustified, IconAlignLeft, IconAlignRight, IconArrowBack, IconArrowForward, IconBlockquote, IconBold, IconClearFormatting, IconCode, IconColumnInsertLeft, IconColumnInsertRight, IconColumnRemove, IconH1, IconH2, IconH3, IconH4, IconH5, IconH6, IconItalic, IconLineDashed, IconLink, IconList, IconListNumbers, IconRowInsertBottom, IconRowInsertTop, IconRowRemove, IconStrikethrough, IconSubscript, IconSuperscript, IconTableOff, IconTablePlus, IconUnderline, IconUnlink } from "@tabler/icons-react"
import { ActiveControl } from "./ActiveControl"
import { TitleControl } from "./TitleControl"
import { TextAlignControl } from "./TextAlingControl"
import { Control } from "./Control"

export const RichTextEditorToolBar = ({ editor }: any) => {
    return (
        <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                <Stack gap="xs" style={{ flex: 1 }}>
                    <Text size="sm" c="dimmed">Fuente</Text>
                    <Group justify="space-between" gap={2}>

                        <ActiveControl
                            editor={editor}
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            isActive={'bold'}
                            icon={IconBold}
                            label="Negrita"
                        />

                        <ActiveControl
                            editor={editor}
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            isActive={'italic'}
                            icon={IconItalic}
                            label="Cursiva"
                        />

                        <ActiveControl
                            editor={editor}
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            isActive={'underline'}
                            icon={IconUnderline}
                            label="Subrayado"
                        />

                        <ActiveControl
                            editor={editor}
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            isActive={'strike'}
                            icon={IconStrikethrough}
                            label="Tachado"
                        />

                        <Control
                            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                            icon={IconClearFormatting}
                            label="Sin formato"
                        />

                        <ActiveControl
                            editor={editor}
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            isActive={'code'}
                            icon={IconCode}
                            label="Código"
                        />

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
                    </Group >
                </Stack>
            </RichTextEditor.Toolbar>


            <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                <Stack gap="xs" style={{ flex: 1 }}>
                    <Text size="sm" c="dimmed">Títulos</Text>
                    <Group gap={3} justify="space-between">

                        <TitleControl
                            editor={editor}
                            level={1}
                            icon={IconH1}
                        />

                        <TitleControl
                            editor={editor}
                            level={2}
                            icon={IconH2}
                        />

                        <TitleControl
                            editor={editor}
                            level={3}
                            icon={IconH3}
                        />

                        <TitleControl
                            editor={editor}
                            level={4}
                            icon={IconH4}
                        />

                        <TitleControl
                            editor={editor}
                            level={5}
                            icon={IconH5}
                        />

                        <TitleControl
                            editor={editor}
                            level={6}
                            icon={IconH6}
                        />

                    </Group >
                </Stack>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                <Text size="sm" c="dimmed">Parrafo</Text>
                <Group gap={3} justify="space-between">

                    <ActiveControl
                        editor={editor}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={"blockquote"}
                        icon={IconBlockquote}
                        label="Cita en bloque"
                    />

                    <Control
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        icon={IconLineDashed}
                        label="Linea horizontal"
                    />

                    <ActiveControl
                        editor={editor}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={"bulletList"}
                        icon={IconList}
                        label="Lista de viñetas"
                    />

                    <ActiveControl
                        editor={editor}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={"orderedList"}
                        icon={IconListNumbers}
                        label="Lista númerada"
                    />

                    <ActiveControl
                        editor={editor}
                        onClick={() => editor.chain().focus().toggleSubscript().run()}
                        isActive={"subscript"}
                        icon={IconSubscript}
                        label="Subíndice"
                    />

                    <ActiveControl
                        editor={editor}
                        onClick={() => editor.chain().focus().toggleSuperscript().run()}
                        isActive={"superscript"}
                        icon={IconSuperscript}
                        label="Superíndice"
                    />
                </Group >
            </RichTextEditor.Toolbar>

            <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                <Stack gap="xs" style={{ flex: 1 }}>
                    <Text size="sm" c="dimmed">Enlace</Text>
                    <Group gap={3} justify="space-between">

                        <Control
                            onClick={() => editor.chain().focus().setLink({ href: prompt('Ingresa la URL') || '' }).run()}
                            icon={IconLink}
                            label="Agregar enlace"
                        />

                        <Control
                            onClick={() => editor.chain().focus().unsetLink().run()}
                            icon={IconUnlink}
                            label="Eliminar enlace"
                        />
                    </Group >
                </Stack>
            </RichTextEditor.Toolbar>


            <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                <Stack gap="xs" style={{ flex: 1 }}>
                    <Text size="sm" c="dimmed">Alineación</Text>
                    <Group gap={3} justify="space-between">

                        <TextAlignControl
                            editor={editor}
                            align="left"
                            icon={IconAlignLeft}
                            label="Izquierda"
                        />

                        <TextAlignControl
                            editor={editor}
                            align="center"
                            icon={IconAlignCenter}
                            label="Centro"
                        />

                        <TextAlignControl
                            editor={editor}
                            align="right"
                            icon={IconAlignRight}
                            label="Derecha"
                        />

                        <TextAlignControl
                            editor={editor}
                            align="justify"
                            icon={IconAlignJustified}
                            label="Justificado"
                        />
                    </Group >
                </Stack>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                <Stack gap="xs" style={{ flex: 1 }}>
                    <Text size="sm" c="dimmed">Cambios</Text>
                    <Group gap={3}>
                        <Control
                            onClick={() => editor.chain().focus().undo().run()}
                            icon={IconArrowBack}
                            label="Deshacer"
                        />

                        <Control
                            onClick={() => editor.chain().focus().redo().run()}
                            icon={IconArrowForward}
                            label="Rehacer"                            
                        />
                    </Group >
                </Stack>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                <Stack gap="xs" style={{ flex: 1 }}>
                    <Text size="sm" c="dimmed">Tabla</Text>
                    <Group gap={3} justify="space-between">
                        <Control
                            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                            icon={IconTablePlus}
                            label="Insertar tabla"
                        />

                        <Control
                            onClick={() => editor.chain().focus().addColumnBefore().run()}
                            icon={IconColumnInsertLeft}
                            label="Agregar columna a la izquierda"
                        />

                        <Control
                            onClick={() => editor.chain().focus().addColumnAfter().run()}
                            icon={IconColumnInsertRight}
                            label="Agregar columna a la derecha"
                        />

                        <Control
                            onClick={() => editor.chain().focus().addRowBefore().run()}
                            icon={IconRowInsertTop}
                            label="Agregar fila arriba"
                        />

                        <Control
                            onClick={() => editor.chain().focus().addRowAfter().run()}
                            icon={IconRowInsertBottom}
                            label="Agregar fila abajo"
                        />
                        
                        <Control
                            onClick={() => editor.chain().focus().deleteRow().run()}
                            icon={IconRowRemove}
                            label="Eliminar fila"
                        />
                        
                        <Control
                            onClick={() => editor.chain().focus().deleteColumn().run()}
                            icon={IconColumnRemove}
                            label="Eliminar columna"
                        />

                        <Control
                            onClick={() => editor.chain().focus().deleteTable().run()}
                            icon={IconTableOff}
                            label="Eliminar tabla"
                        />
                    </Group >
                </Stack>
            </RichTextEditor.Toolbar>
        </RichTextEditor>
    )
}