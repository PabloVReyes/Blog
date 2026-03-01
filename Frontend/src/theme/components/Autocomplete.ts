export const Autocomplete = {
    defaultProps: {
        radius: "md",
    },

    styles: () => ({
        input: {
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            color: "light-dark(black, white)",
            borderColor: "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",
            transition: "border-color 0.15s ease",

            "&:focus": {
                borderColor: "light-dark(oklch(60% 0.12 260), oklch(70% 0.12 260))",
            },

            "&::placeholder": {
                color: "light-dark(#6b7280, #9ca3af)",
            },
        },

        label: {
            color: "light-dark(#111827, #e5e7eb)",
            fontWeight: 500,
        },

        dropdown: {
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            borderColor: "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",
        },

        item: {
            color: "light-dark(black, white)",
            "&[data-selected]": {
                backgroundColor: "var(--mantine-primary-color-filled)",
            },
            "&:hover": {
                backgroundColor: "light-dark(oklch(95% 0.01 260), oklch(35% 0.04 260))",
            },
        },

        error: {
            color: "red",
        },
    }),
};
