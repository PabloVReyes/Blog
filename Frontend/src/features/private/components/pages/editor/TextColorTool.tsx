// TextColorPopover.tsx
import { Popover, Stack, Button } from '@mantine/core';

interface Color {
  color: string;
  label: string;
}

interface Props {
  colors: Color[];
  onSelect: (color: string) => void;
  opened: boolean;
  onClose: () => void;
}

export const TextColorPopover = ({ colors, onSelect, opened, onClose }: Props) => {
  return (
    <Popover opened={opened} onClose={onClose} withArrow position="bottom">
      <Stack gap="xs">
        {colors.map((c) => (
          <Button
            key={c.color}
            style={{ backgroundColor: c.color, color: '#fff', minWidth: 60 }}
            onClick={() => onSelect(c.color)}
          >
            {c.label}
          </Button>
        ))}
      </Stack>
    </Popover>
  );
};
