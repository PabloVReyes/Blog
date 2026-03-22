import { Button, Text } from "@mantine/core";
import type { ManualData } from "../../types/manuals.types";

interface ManualButtonProps {
    manual: ManualData;
    rotate?: number;
    size: 'md' | 'xl';
    onClick?: () => void;
}

export const ManualButton = ({ manual, rotate, size, onClick }: ManualButtonProps) => {
    if (!manual) return null;

    return (
        <Button
            size={size}
            color={manual.manualType.color}
            disabled={!manual.fileId}
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
