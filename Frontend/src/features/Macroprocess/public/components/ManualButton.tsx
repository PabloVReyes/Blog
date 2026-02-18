import { Button, Text } from "@mantine/core";

interface ManualButtonProps {
    manual: any;
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
            disabled={!manual.storedName}
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
