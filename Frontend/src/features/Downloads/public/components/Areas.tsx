import { ActionIcon, Stack, Text } from "@mantine/core";
import classes from "./Areas.module.css";
import { useNavigate } from "react-router-dom";
import { getTablerIcon } from "@/helpers";
import type { CSSProperties } from "react";

interface Props {
    color: string;
    icon: string;
    name: string;
    slug: string;
}

const getContrastColor = (hex: string) => {
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? '#000' : '#fff';
};

export const Areas = ({ color, icon, name, slug }: Props) => {
    const navigate = useNavigate();
    const Icon = getTablerIcon(icon);

    const contrast = getContrastColor(color);

    return (
        <Stack
            align="center"
            gap="sm"
            mt={20}
            onClick={() => navigate(slug)}
            className={classes.button}
        >
            <ActionIcon
                data-circle
                size={96}
                radius="50%"
                variant="filled"
                className={classes.circle}
                style={{
                    '--circle-bg': color,
                    '--circle-color': contrast,
                } as CSSProperties}
            >
                <Icon size={40} />
            </ActionIcon>

            <Text
                size="md"
                fw={700}
                ta="center"
                className={classes.text}
            >
                {name}
            </Text>
        </Stack>
    );
};