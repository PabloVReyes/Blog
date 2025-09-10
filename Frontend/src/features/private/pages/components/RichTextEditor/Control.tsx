import { RichTextEditor } from "@mantine/tiptap";

export const Control = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => {

    return (
        <RichTextEditor.Control
            onClick={onClick}
            style={{
                display: 'flex',
                flex: '1 1 auto',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
            }}
        >
            <Icon size={18} />
            <span style={{ fontSize: '12px' }}>{label}</span>
        </RichTextEditor.Control>
    );
}