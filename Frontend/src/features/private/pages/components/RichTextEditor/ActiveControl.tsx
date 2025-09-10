import { RichTextEditor } from "@mantine/tiptap";
import { useState, useEffect } from "react";

export const ActiveControl = ({ editor, isActive, icon: Icon, label, onClick }: { editor: any, isActive: any, icon: any, label: string, onClick: () => void }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!editor) return;

        const update = () => {
            setActive(editor.isActive(isActive));
        };

        editor.on('selectionUpdate', update);
        editor.on('transaction', update);

        return () => {
            editor.off('selectionUpdate', update);
            editor.off('transaction', update);
        };
    }, [editor]);

    return (
        <RichTextEditor.Control
            onClick={onClick}
            style={{
                flex: '1 1 auto',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                backgroundColor: active ? 'light-dark(var(--mantine-primary-color-6), var(--mantine-primary-color-8))' : "light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))",
                color: active ? "white" : 'light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))'
            }}
        >
            <Icon size={18} />
            <span style={{ fontSize: '12px' }}>{label}</span>
        </RichTextEditor.Control>
    );
}