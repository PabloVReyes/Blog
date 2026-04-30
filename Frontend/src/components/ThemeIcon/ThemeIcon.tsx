import {
    Box,
    type BoxProps,
    useMantineTheme,
    parseThemeColor,
    rem,
    type MantineColor,
    rgba,
    getContrastColor
} from '@mantine/core';
import classes from "./ThemeIcon.module.css";

interface ThemeIconProps extends BoxProps {
    color?: MantineColor | string | null;
    size?: number | string;
    variant?: 'light' | 'filled' | 'transparent'; // Agregamos 'transparent'
    children: React.ReactNode;
    radius?: number;
    onClick?: () => void;
}

const combineClasses = (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(' ');

export function ThemeIcon({
    color,
    size = 56,
    variant = 'light',
    children,
    style,
    className,
    radius = 12,
    onClick,
    ...others
}: ThemeIconProps) {
    const theme = useMantineTheme();
    const finalColor = color || theme.primaryColor;
    const parsed = parseThemeColor({ color: finalColor, theme });

    const getColors = () => {
        const solidColor = parsed.isThemeColor ? `var(${parsed.variable})` : parsed.color;
        const contrastColor = getContrastColor({ color: parsed.color, theme });

        if (parsed.isThemeColor) {
            const colorName = parsed.variable?.split('-')[4] || theme.primaryColor;

            // Lógica para versión ThemeColor
            const bg = {
                filled: solidColor,
                light: `var(--mantine-color-${colorName}-light)`,
                transparent: 'transparent'
            }[variant];

            const textColor = {
                filled: contrastColor,
                light: `var(--mantine-color-${colorName}-light-color)`,
                transparent: solidColor
            }[variant];

            return {
                bg,
                color: textColor,
                hoverBg: variant === 'transparent' ? `var(--mantine-color-${colorName}-light)` : solidColor,
                hoverColor: variant === 'transparent' ? `var(--mantine-color-${colorName}-light-color)` : contrastColor,
            };
        }

        // Lógica para Hexadecimal
        const hexBg = {
            filled: solidColor,
            light: rgba(parsed.color, 0.12),
            transparent: 'transparent'
        }[variant];

        const hexColor = {
            filled: contrastColor,
            light: parsed.color,
            transparent: parsed.color
        }[variant];

        return {
            bg: hexBg,
            color: hexColor,
            // En transparent hex, el hover simula un estilo 'light'
            hoverBg: variant === 'transparent' ? rgba(parsed.color, 0.12) : solidColor,
            hoverColor: variant === 'transparent' ? parsed.color : contrastColor,
        };
    };

    const colors = getColors();

    return (
        <Box
            {...others}
            data-icon
            className={combineClasses(classes.icon, className)}
            style={{
                '--icon-bg': colors.bg,
                '--icon-color': colors.color,
                '--icon-bg-hover': colors.hoverBg,
                '--icon-color-hover': colors.hoverColor,
                width: rem(size),
                height: rem(size),
                borderRadius: rem(radius),
                ...style,
            } as any}
            onClick={onClick}
        >
            {children}
        </Box>
    );
}