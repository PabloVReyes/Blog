import { Button, Text } from "@mantine/core";

interface ManualButtonProps {
    manual: Manual;
    rotate?: number;
    size: 'md' | 'xl';
    onClick?: () => void;
}

export interface Manual {
    id: string;
    fileName: null;
    filePath: null;
    fileSize: null;
    mimeType: null;
    areaId: string;
    manualTypeId: string;
    createdAt: Date;
    updatedAt: Date;
    manualType: ManualType;
}

export interface ManualType {
    id: string;
    name: string;
    color: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}


export const ManualButton = ({ manual, rotate, size, onClick }: ManualButtonProps) => {
    if (!manual) return null;

    return (
        <Button
            size={size}
            color={manual.manualType.color}
            disabled={!manual.fileName}
            onClick={onClick}
            style={{ minWidth: 0, height: '100%' }}
        >
            <Text
                p={10}
                fw={700}
                size={size}
                ta="center"
                style={{
                    transform: rotate ? `rotate(${rotate}deg)` : undefined,
                    whiteSpace: 'normal',
                    overflowWrap: 'anywhere',
                }}
            >
                {manual.manualType.name}
            </Text>
        </Button>
    );
};
